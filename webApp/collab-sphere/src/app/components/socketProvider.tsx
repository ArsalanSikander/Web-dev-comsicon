'use client';

// this is to be used in the layout and will provide socket connectivity to the webapp

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [socket, setSocket] = useState<Socket | null>(null);


    useEffect(() => {
        async function setupSocket() {
            let connString = `localhost:3006`;
            const socketInstance = io(connString,
                {
                    transports: ["websocket"]
                });

            setSocket(socketInstance);

            return () => {
                socketInstance.disconnect();
            };
        }

        setupSocket();


    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): Socket | null => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context.socket;
};