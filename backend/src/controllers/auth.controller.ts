import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const user = await createUser(username, email, password);

    return res.status(201).json({
      message: "User registered successfully.",
      user,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ accessToken });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}