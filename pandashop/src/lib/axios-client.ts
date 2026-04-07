import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(async (config) => {
    try {
        const { data } = await axios.get('/api/auth/token');
        if (data.token) {
            config.headers.Authorization = `Bearer ${data.token}`;
        }
    } catch (error) {
        // Pas de token disponible
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post('/api/auth/refresh'); 
                
                return axiosClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;