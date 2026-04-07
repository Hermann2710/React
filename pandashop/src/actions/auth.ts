'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { axiosServer } from '@/lib/axios-server'
import { LoginResponseSchema, LoginSchema, RegisterResponseSchema, RegisterSchema } from '@/types/auth'
import { UserSchema } from '@/types/user'

export async function loginAction(formData: FormData) {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    remember: formData.get('remember') === 'on',
  }

  const parsed = LoginSchema.safeParse(rawData)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message }
  }

  try {
    const api = await axiosServer()
    const response = await api.post('/auth/login', parsed.data)
    const validated = LoginResponseSchema.parse(response.data)

    const cookieStore = await cookies()
    
    cookieStore.set('access_token', validated.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: validated.expires_in,
      path: '/',
    })

    cookieStore.set('refresh_token', validated.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: parsed.data.remember ? 30 * 24 * 3600 : 24 * 3600,
      path: '/',
    })
  } catch (error: any) {
    const message = error.response?.data?.message || 'Identifiants invalides.'
    return { success: false, error: message }
  }

  redirect('/dashboard')
}

export async function registerAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries())
  const parsed = RegisterSchema.safeParse(rawData)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message }
  }

  try {
    const api = await axiosServer()
    const response = await api.post('/auth/register', parsed.data)
    RegisterResponseSchema.parse(response.data)
  } catch (error: any) {
    const message = error.response?.data?.message || "Erreur lors de l'inscription."
    return { success: false, error: message }
  }

  redirect('/auth/login')
}

export async function getMeAction() {
  try {
    const api = await axiosServer()
    const response = await api.get('/auth/me')
    const user = UserSchema.parse(response.data)
    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: 'Non authentifié.' }
  }
}

export async function logoutAction() {
  try {
    const api = await axiosServer()
    await api.post('/auth/logout')
  } catch (error) {
    // Fail silently
  }

  const cookieStore = await cookies()
  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')
  
  redirect('/auth/login')
}