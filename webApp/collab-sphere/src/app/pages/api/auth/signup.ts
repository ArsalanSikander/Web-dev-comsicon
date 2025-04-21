// pages/api/auth/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';
import { IUser } from '@/lib/types/user';

type SignupRequestBody = {
  name: string;
  email: string;
  password: string;
  role: 'Manager' | 'TeamMember';
};

type SignupResponseData = {
  message: string;
  user?: Partial<IUser>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { name, email, password, role } = req.body as SignupRequestBody;
    
    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (!['Manager', 'TeamMember'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    
    // Return success without sending password
    const userWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };
    
    return res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}