// src/api/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7437/',
  headers: {
    'Content-Type': 'application/json',
  },
});


export async function postLoginFe(email: string, password: string): Promise<ApiResponse<any>>  {
    try {
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/user/login/fe", {email, password});

        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function getExerciseList(): Promise<ApiResponse<any>>  {
    try {
        const result: ApiResponse<any> = await axiosInstance.get<ApiResponse<any>>("/exercise/list");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export default axiosInstance;