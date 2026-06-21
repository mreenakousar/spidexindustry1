import type { Request, Response } from "express";
import * as authService from "../services/auth.service.ts";
import { setAuthCookies } from "../lib/cookies.ts";

interface Session {
  access_token?: string;
  [key: string]: any;
}

interface AuthResult {
  session?: Session;
  [key: string]: any;
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.signup(req.body);

    setAuthCookies(res as any, result.session);
    res.status(201).json({ message: "user created succesfully", data: result });
  } catch (error:any) {
    res.status(error.status || 500).json(error);
  }
};




export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body);

    setAuthCookies(res as any, result.session);
    res.status(200).json({ message: "user login success" });
  } catch (error: any) {

    res.status(error.status || 500).json(error);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    await authService.logout();
    res.clearCookie("token");
    res.status(200).json({ message: "user logout success" });
  } catch (error: any) {
    res.status(error.status || 500).json(error);
  }
};