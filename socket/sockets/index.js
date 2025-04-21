import mongoose from 'mongoose';

// Define the chat message schema
const chatMessageSchema = new mongoose.Schema({
    project_id: { type: String, required: true },
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Create the ChatMessage model
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema); // 'ChatMessage' will be the name of the model, Mongoose will pluralize it to 'chatmessages' in the database (by default)

const socketHandler = (socket, io) => {
    console.log('A user connected:', socket.id);

    const saveMessageToDatabase = async (projectId, userId, messageContent) => {
        try {
            const newMessage = new ChatMessage({
                project_id: projectId,
                user_id: userId,
                content: messageContent,
            });
            const savedMessage = await newMessage.save();
            console.log('Message saved to database:', savedMessage._id);
            return savedMessage; // Return the saved Mongoose document
        } catch (error) {
            console.error('Error saving message to database:', error);
            return null;
        }
    };

    socket.on('joinProjectRoom', (projectId) => {
        socket.join(projectId);
        console.log(`A user ${socket.id} joined room: ${projectId}`);

        io.to(projectId).emit('userJoined', { userId: socket.id });

        // when a user sends a message to a project room
        socket.on('sendMessage', (data) => {
            const { projectId, message } = data;
            // save the message to your database
            saveMessageToDatabase(projectId, socket.handshake.auth.userId, message)
                .then((savedMessage) => {
                    if (savedMessage) {
                        // emit the message to all other clients in the same project room
                        io.to(projectId).emit(`newMessage:${projectId}`, {
                            _id: savedMessage._id,
                            userId: savedMessage.user_id,
                            content: savedMessage.content,
                            timestamp: savedMessage.timestamp,
                        });
                    } else {
                        console.error('Failed to save and emit message.');
                        socket.emit('sendMessageFailed', { error: 'Failed to save message.' });
                    }
                });
        });

        // user leaves / logs out
        socket.on('leaveProjectRoom', (projectId) => {
            socket.leave(projectId);
            console.log(`User ${socket.id} left room: ${projectId}`);
            io.to(projectId).emit('userLeft', { userId: socket.id });
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // handles the auto disconnection from all rooms 
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.leave(room);
                console.log(`User ${socket.id} automatically left room: ${room}`);
            }
        }
    });
};

export default socketHandler;