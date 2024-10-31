import prisma from '../model/prismaClient.js'; // Prisma client setup
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ userId: user.user_id, email: user.email, userType: user.user_type }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });
};

// Signup route
export const signup = async (req, res) => {
  const { username, email, password, user_type, first_name, last_name, phone_number } = req.body;

  // Basic input validation
  if (!email || !password || !username || !user_type || !first_name || !last_name || !phone_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if email already exists
    const existingUser = await prisma.registration.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in Registration table
    const newUser = await prisma.registration.create({
      data: {
        username,
        email,
        password: hashedPassword,
        user_type,
      },
    });

    const saveToLogin = await prisma.login.create({
      data: {
        user_id: newUser.user_id,
        user_name: newUser.email,
        password: hashedPassword,
        user_type: newUser.user_type
      }
    })

    // Conditionally create a Student or Teacher record
    if (user_type === 'student') {
      await prisma.student.create({
        data: {
          user_id: newUser.user_id,
          first_name,
          last_name,
          phone_number,
          email,
        },
      });
    } else if (user_type === 'teacher') {
      await prisma.teacher.create({
        data: {
          user_id: newUser.user_id,
          first_name,
          last_name,
          phone_number,
          email,
        },
      });
    }

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Login route
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    console.log(typeof email);
     
    const user = await prisma.login.findUnique({ where: { user_name: email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
