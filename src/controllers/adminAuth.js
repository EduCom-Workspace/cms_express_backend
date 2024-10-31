import prisma from "../model/prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Helper function to generate JWT
const generateToken = (userId, email) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        {
            expiresIn: "10d",
        }
    );
};

const signupAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if email already exists
        const existingUser = await prisma.admin.findFirst({ where: { email } });
        if (existingUser == null) {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create new user
            const newUser = await prisma.admin.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            
            // Generate JWT and send response
            const token = generateToken(newUser.admin_id, newUser.email);
            return res.status(201).json({ user: newUser, token });
        } else {
            return res
                .status(400)
                .json({ message: "User already exists with this email" });

        }
    } catch (error) {
        return res.status(400).json({ message: 'Error signup!', error: error.message });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Find user by email
        const user = await prisma.admin.findFirst({ where: { email } });
        if (user == null) {
            return res.status(401).json({ message: "Invalid Credentials." });
        }
        else {
            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid Password." });
            }
            // Generate JWT and send response
            const token = generateToken(user.admin_id, user.email);
            return res.status(200).json({ message: 'Login successful.', token });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error logging in', error: error.message });
    }
};


export { signupAdmin, loginAdmin };