import type { Response, CookieOptions } from "express";

export const setAuthCookies = (res: Response, session: any) => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("access_token", session.access_token, {
    ...cookieOptions,
    maxAge: session.expires_in * 1000,
  });

  res.cookie("refresh_token", session.refresh_token, {
    ...cookieOptions,
    maxAge: session.refresh_expires_in * 1000,
  });
};
