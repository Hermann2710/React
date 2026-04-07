import * as z from "zod"

export const UserSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.email("L'email est invalide !"),
    email_verified_at: z.string().nullable().optional(),
    role: z.enum(["client", "admin"]).default("client"),
    phone: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    gender: z.enum(["male", "female", "other"]).nullable().optional(),
    birth_date: z.string().nullable().optional(),
    remember_token: z.string().nullable().optional(),
    created_at: z.string(),
    updated_at: z.string(),
})

export type UserData = z.infer<typeof UserSchema>