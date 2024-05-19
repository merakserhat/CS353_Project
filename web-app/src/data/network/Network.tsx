// src/api/axiosConfig.ts
import { height } from '@mui/system';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:7437/',
    headers: {
        'Content-Type': 'application/json',
    },
});


export async function postLoginFe(email: string, password: string): Promise<ApiResponse<any>> {
    try {
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<LoginModel>>("/user/login/fe", { email, password });

        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function postLoginTrainer(email: string, password: string): Promise<ApiResponse<any>> {
    try {
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/user/login/trainer", { email, password });

        return result;
    } catch (error: any) {
        return error.response;
    }

    // console.log(response.data.user_id);
}

export async function postRegsiterFe(email: string, password: string, first_name: string, middle_name: string, last_name: string, weight: string, height: string, age: string, gender: string): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<RegisterModel>>("/user/register/fe", { email, password, first_name, middle_name, last_name, weight, height, age, gender });
        // console.log(result)
        return result;
    } catch (error: any) {
        return error.response;
    }

}

export async function getExerciseList(): Promise<ApiResponse<any>> {
    try {
        const result = await axiosInstance.get<ApiResponse<ExerciseModel[]>>("/exercise/list");
        // console.log(reskult);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function getExerciseLogList(feId: string): Promise<ApiResponse<any>> {
    try {
        const result = await axiosInstance.get<ApiResponse<ExerciseLogModel[]>>(`/exercise_log/list/${feId}`);
        // console.log(reskult);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export default axiosInstance;