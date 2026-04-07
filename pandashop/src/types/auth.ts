import * as z from "zod"
import { UserSchema } from "./user"

//#region Auth Data Types
export const LoginSchema = z.object({
    email: z.email("Le email est invalide !"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères !"),
    remember: z.boolean().optional(),
})

export type LoginData = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
    first_name: z.string().min(3, "Le prénom est trop court !"),
    last_name: z.string().min(3, "Le nom est trop court !"),
    email: z.email("Le email est invalide !"),
    password: z.string().min(8, "Le mot de passe est trop court !"),
    password_confirmation: z.string().min(8, "La confirmation du mot de passe est trop courte !"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas !",
    path: ["password_confirmation"],
})

export type RegisterData = z.infer<typeof RegisterSchema>

//#region Auth Response Types
export const LoginResponseSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    user: UserSchema,
    expires_in: z.number()
})

export type LoginResponseData = z.infer<typeof LoginResponseSchema>

export const RegisterResponseSchema = z.object({
    message: z.string(),
    user: UserSchema
})

export type RegisterResponseData = z.infer<typeof RegisterResponseSchema>