import { KeepsExerciseModel } from "./KeepsExerciseModel";

export interface WorkoutModel {
    trainer_id?: string;
    fe_id?: string; 
    name: string;
    audience: string;
    description: string;
    exercises: KeepsExerciseModel[];
}