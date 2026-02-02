import { z } from "zod";

export const SignUpSchema = z.object({
  displayName: z
    .string()
    .min(1, "Field is empty")
    .min(3, "Display Name must be at least 3 characters long")
    .max(10, "Display Name maximum 10 characters long"),
  email: z
    .string()
    .min(1, "Field is empty")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Field is empty")
    .min(8, "Password must be at least 8 characters long")
  })
  
export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, "Field is empty")
    .email("Invalid email address"),
    password: z
    .string()
    .min(1, "Field is empty")
    .min(8, "Password must be at least 8 characters long"),
    rememberMe: z
    .boolean()
  })
  
export const ResendVerifySchema = z.object({
  email: z
    .string()
    .min(1, "Field is empty")
    .email("Invalid email address")
})

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Field is empty")
    .email("Invalid email address")
})

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Field is empty")
    .min(8, "Password must be at least 8 characters long"),
  token: z
    .string()
    .min(1, "Token is required")
})



export type SignUpCredentials = z.infer<typeof SignUpSchema>
export type SignInCredentials = z.infer<typeof SignInSchema>
export type ResendVerifyCredentials = z.infer<typeof ResendVerifySchema>
export type ForgotPasswordCredentials = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordCredentials = z.infer<typeof ResetPasswordSchema>