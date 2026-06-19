export type UserRole = "admin" | "client";

export interface User {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}
