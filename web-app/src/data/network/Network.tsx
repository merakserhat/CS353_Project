// src/api/axiosConfig.ts
import { height } from '@mui/system';
import axios from 'axios';
import { WorkoutModel } from '../models/WorkoutModel';
import { KeepsExerciseModel } from '../models/KeepsExerciseModel';

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

export async function postCreateGoal(feId: string, name: string, target_region: string, calorie: number, duration: number): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<GoalModel>>("/fitness_goal/create", { feId, name, target_region, calorie, duration });
        console.log(result)
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function getFitnessGoals(feId: string): Promise<ApiResponse<any>> {
    try {
        const result = await axiosInstance.get<ApiResponse<GoalModel>>(`/fitness_goal/list?fe_id=${feId}`);
        console.log(result);
        return result;
    } catch (error: any) {
        console.log("feid", feId);
        console.log("snnnan", error);
        return error.response;
    }
}

export async function postCreateWorkoutFe(fe_id: string, name: string, audience: string, description: string, exercises: KeepsExerciseModel[]): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const data = { fe_id, name, audience, description, exercises };
        console.log("data", data);
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/workout/create/fe", data);
        console.log("adafsd");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function postCreateNutritionFe(fe_id: string, name: string, description: string, nutritionsIds: {nut_id: string, portion: number}[]): Promise<ApiResponse<any>> {
    try {
        const data = { fe_id, name, description, nutritions: nutritionsIds };
        console.log("data", data);
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<{nutrition_plan: NutritionPlanModel}>>("/nutrition_plan/create", data);
        console.log(result)
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function deleteNutrition(plan_id: string): Promise<ApiResponse<any>> {
    try {
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<{nutrition_plan: NutritionPlanModel}>>("/nutrition_plan/delete", {plan_id});
        console.log(result)
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function getNutritionList(feId: string): Promise<ApiResponse<any>> {
    try {
        const result = await axiosInstance.get<ApiResponse<{nutrition_plans: NutritionPlanModel[]}>>(`/nutrition_plan/list?fe_id=${feId}`);
        console.log(result);
        return result;
    } catch (error: any) {
        console.log("feid", feId);
        console.log("snnnan", error);
        return error.response;
    }
}

export async function postCreateWorkoutTr(trainer_id: string, name: string, audience: string, description: string, exercises: KeepsExerciseModel[]): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const data = { trainer_id, name, audience, description, exercises };
        console.log("data", data);
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/workout/create/trainer", data);
        console.log("adafsd");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function getWorkoutList(): Promise<ApiResponse<any>> {
    try {
        const result = await axiosInstance.get<ApiResponse<WorkoutModel[]>>("/workout/list");
        console.log("asfaf");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}


export async function getFeWorkouts(fe_id: string): Promise<ApiResponse<any>> {
    try {
        const result = await axiosInstance.get<ApiResponse<WorkoutModel[]>>(`/workout/list/fe?fe_id=${fe_id}`);
        console.log(result);
        console.log(fe_id);

        return result;
    } catch (error: any) {
        console.log("feid", fe_id);
        console.log("snnnan", error);
        return error.response;
    }
}

export async function postPickWorkout(workout_id: string, fe_id: string): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const data = { workout_id, fe_id };
        console.log("anaa");
        console.log("data", data);
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/workout/pick", data);
        console.log("adafsd");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function postFinishWorkout(fe_id: string, workout_id: string): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const data = { fe_id, workout_id };
        console.log("anaa");
        console.log("data", data);
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/workout/finish", data);
        console.log("adafsd");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function getWorkoutLogs(fe_id: string): Promise<ApiResponse<any>> {
    try {
        const result = await axiosInstance.get<ApiResponse<WorkoutModel[]>>(`/workout/log?fe_id=${fe_id}`);
        console.log(result);
        console.log(fe_id);

        return result;
    } catch (error: any) {
        console.log("feid", fe_id);
        console.log("snnnan", error);
        return error.response;
    }
}

export async function postCreateAchievement(fe_id: string, goal_id: string): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const data = { fe_id, goal_id };
        console.log("anaa");
        console.log("data", data);
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/achievement/create", data);
        console.log("adafsd");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function postStartChat(session_id: string): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const data = { session_id };
        console.log("anaa");
        console.log("data", data);
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/chat/start", data);
        console.log("adafsd");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export async function postSendMessage(chat_id: string, session_id: string, ): Promise<ApiResponse<any>> {
    try {
        // console.log("em", email)
        const data = { session_id };
        console.log("anaa");
        console.log("data", data);
        const result: ApiResponse<any> = await axiosInstance.post<ApiResponse<any>>("/achievement/create", data);
        console.log("adafsd");
        console.log(result);
        return result;
    } catch (error: any) {
        return error.response;
    }
}

export default axiosInstance;