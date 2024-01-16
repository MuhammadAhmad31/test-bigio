
const dbPool = require("../config/database");

import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { Auth } from "../types/auth.type";

export const registerModel = async (body: Auth) => {
  const sqlQuery = `INSERT INTO auth (name, email, password) VALUES (?, ?, ?)`;

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const values = [body.name, body.email, hashedPassword];

  try {
    const [rows] = await dbPool.execute(sqlQuery, values);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const loginModel = async (email: string, password: string) => {
  const sqlQuery = `SELECT * FROM auth WHERE email = ?`;
  const values = [email];

  try {
    const [rows] = await dbPool.execute(sqlQuery, values);

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(payload);

    return { user, token };
  } catch (error) {
    throw error;
  }
};
