import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import NovaCrypt from "../../NovaCrypt.js";
import { error } from "console";

const prisma = new PrismaClient();
const nc = new NovaCrypt(18731, 4);

const genStudentId = async (userName: string): Promise<string> => {
  let studentid: string;
  let checkStudentId;

  do {
    // Generate a random student ID
    const randomPart1 = Math.floor(Math.random() * (9999 - 111 + 1)) + 111;
    const randomPart2 = Math.floor(Math.random() * (999 - 11 + 1)) + 111;

    studentid = `${randomPart1}${userName}${randomPart2}`;

    // Check if the student ID already exists
    checkStudentId = await prisma.user.findUnique({
      where: { studentid },
    });
  } while (checkStudentId); // Repeat until a unique ID is found

  return studentid; // Return the unique student ID
};

export const userAuthSignUp = async (req: Request, res: Response) => {
  let checkEmailUserName: string = "";
  const { fullName, userId, email, pasw, phone, secQs, secQsAns } = req.body;

  if (
    !fullName ||
    !userId ||
    !email ||
    !pasw ||
    !phone ||
    !secQs ||
    !secQsAns
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // generate a unique student ID
    const studentid: string = await genStudentId(userId);

    // Check if email already exists
    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });

    existingEmailUser
      ? (checkEmailUserName = "Email is already in use. \n")
      : null;

    // Check if userId already exists
    const existingUsernameUser = await prisma.user.findUnique({
      where: { userId },
    });

    existingUsernameUser
      ? (checkEmailUserName += "UserId is already in use.")
      : null;

    if (checkEmailUserName !== "") {
      return res.status(400).json({ message: checkEmailUserName });
    }

    const newUser = await prisma.user.create({
      data: {
        name: fullName,
        userId,
        email,
        studentid,
        phone,
      },
    });

    const addToRegister = await prisma.registration.create({
      data: {
        userId,
        email,
        pasw: nc.encrypt(pasw),
        security_question: secQs,
        answer: secQsAns,
        userType: "student",
        userName: userId + "_" + fullName,
      },
    });

    return res.status(201).json({
      status: 201,
      message: "User signed up successfully",
      data: { newUser, addToRegister },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const userAuthLogin = async (req: Request, res: Response) => {
  const { email, pasw } = req.body;
  if (!email || !pasw) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const findUser = await prisma.registration.findFirst({
    where: { email },
  });
  // console.log("Server Pasw: ", nc.decrypt(findUser.pasw));
  // console.log("Clind Pasw: ", pasw);
  if (!findUser) {
    return res.status(401).json({ msg: "Invalid email or password" });
  } else if ((findUser.pasw) !== nc.encrypt(pasw)) {
    res.status(401).json({ msg: "Invalid password. Please enter correct password." });
  } else {
    res.status(200).json({ msg: "Login Successfully." });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const allStudents = await prisma.user.findMany();
    return res.status(200).json({
      status: 200,
      data: allStudents,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const deletedUsers = await prisma.user.deleteMany();
    const deletedUsersReg = await prisma.registration.deleteMany();
    console.log(`Deleted ${deletedUsers.count} users.`);
    console.log(`Deleted ${deletedUsersReg.count} registration.`);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting users:", error);
    res.sendStatus(500);
  }
};
