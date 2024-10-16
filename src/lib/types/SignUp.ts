import { object, string } from "zod";

export const signUpSchema = object({
  username: string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .min(3, "Username must be more than 3 characters")
    .max(32, "Username must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string({
    required_error: "passwordConfirm confirmation is required"})
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});