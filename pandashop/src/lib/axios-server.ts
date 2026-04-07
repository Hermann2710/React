import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosServer = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });
};