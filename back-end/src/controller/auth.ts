import { Request, Response } from "express";
import { registerModel, loginModel } from "../models/auth";

export const register = async (req: Request, res: Response) => {
  const { body } = req;

  if (!body.name || !body.email || !body.password) {
    res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
    return;
  }

  try {
    await registerModel(body);
    res.status(201).json({
      message: "Register users success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Register users failed",
      error: error,
    });
  }
};

let loginAttempts = new Map<string, number>();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (loginAttempts.has(email) && loginAttempts.get(email)! >= 3) {
    return res
      .status(429)
      .json({
        success: false,
        message: "Too many login attempts. Please try again later.",
      });
  }

  try {
    const {user, token } = await loginModel(email, password);

    loginAttempts.delete(email);
    res.json({ success: true, user, token });
  } catch (error) {
    if (loginAttempts.has(email)) {
      loginAttempts.set(email, loginAttempts.get(email)! + 1);
    } else {
      loginAttempts.set(email, 1);
    }
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

