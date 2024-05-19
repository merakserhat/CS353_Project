import { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContextProps";

interface GlobalProviderProps {
    children: ReactNode;
}

const exerc = [
    {
        "description": "A compound exercise that targets the chest, shoulders, and triceps.",
        "exercise_id": "1",
        "exercise_name": "Bench Press (Barbell or Dumbbell)",
        "target_region": "Chest"
    },
    {
        "description": "A compound exercise that targets the back, glutes, and hamstrings.",
        "exercise_id": "10",
        "exercise_name": "Deadlifts",
        "target_region": "Back"
    },
    {
        "description": "A compound exercise that targets the middle back and lats.",
        "exercise_id": "11",
        "exercise_name": "Bent Over Rows (Barbell or Dumbbell)",
        "target_region": "Back"
    },
    {
        "description": "An exercise that targets the latissimus dorsi muscles.",
        "exercise_id": "12",
        "exercise_name": "Lat Pulldowns",
        "target_region": "Back"
    },
    {
        "description": "A compound exercise that targets the middle back.",
        "exercise_id": "13",
        "exercise_name": "Seated Row (Cable)",
        "target_region": "Back"
    },
    {
        "description": "A compound exercise that targets the middle back and lats.",
        "exercise_id": "14",
        "exercise_name": "T-Bar Rows",
        "target_region": "Back"
    },
    {
        "description": "An exercise that targets the lats and middle back.",
        "exercise_id": "15",
        "exercise_name": "Single-Arm Dumbbell Row",
        "target_region": "Back"
    },
    {
        "description": "An exercise that targets the rear deltoids and upper back.",
        "exercise_id": "16",
        "exercise_name": "Face Pulls",
        "target_region": "Back"
    },
    {
        "description": "A compound exercise that targets the shoulder muscles.",
        "exercise_id": "17",
        "exercise_name": "Overhead Press (Barbell or Dumbbell)",
        "target_region": "Shoulders"
    },
    {
        "description": "An isolation exercise that targets the side deltoids.",
        "exercise_id": "18",
        "exercise_name": "Lateral Raises",
        "target_region": "Shoulders"
    },
    {
        "description": "An isolation exercise that targets the front deltoids.",
        "exercise_id": "19",
        "exercise_name": "Front Raises",
        "target_region": "Shoulders"
    },
    {
        "description": "A variation of the bench press that targets the upper chest.",
        "exercise_id": "2",
        "exercise_name": "Incline Bench Press",
        "target_region": "Chest"
    },
    {
        "description": "An isolation exercise that targets the rear deltoids.",
        "exercise_id": "20",
        "exercise_name": "Reverse Pec Deck (Rear Delt Fly)",
        "target_region": "Shoulders"
    },
    {
        "description": "A variation of the overhead press that targets all three heads of the deltoid.",
        "exercise_id": "21",
        "exercise_name": "Arnold Press",
        "target_region": "Shoulders"
    },
    {
        "description": "An exercise that targets the shoulder muscles and upper traps.",
        "exercise_id": "22",
        "exercise_name": "Upright Rows",
        "target_region": "Shoulders"
    },
    {
        "description": "An isolation exercise that targets the side deltoids using cables.",
        "exercise_id": "23",
        "exercise_name": "Cable Lateral Raises",
        "target_region": "Shoulders"
    },
    {
        "description": "An exercise that targets the upper trapezius muscles.",
        "exercise_id": "24",
        "exercise_name": "Shrugs",
        "target_region": "Shoulders"
    },
    {
        "description": "A compound exercise that targets the bicep muscles.",
        "exercise_id": "25",
        "exercise_name": "Barbell Curls",
        "target_region": "Biceps"
    },
    {
        "description": "An isolation exercise that targets the bicep muscles.",
        "exercise_id": "26",
        "exercise_name": "Dumbbell Curls",
        "target_region": "Biceps"
    },
    {
        "description": "An exercise that targets the biceps and forearms.",
        "exercise_id": "27",
        "exercise_name": "Hammer Curls",
        "target_region": "Biceps"
    },
    {
        "description": "An isolation exercise that targets the biceps using a preacher bench.",
        "exercise_id": "28",
        "exercise_name": "Preacher Curls",
        "target_region": "Biceps"
    },
    {
        "description": "An isolation exercise that targets the biceps.",
        "exercise_id": "29",
        "exercise_name": "Concentration Curls",
        "target_region": "Biceps"
    },
    {
        "description": "A variation of the bench press that targets the lower chest.",
        "exercise_id": "3",
        "exercise_name": "Decline Bench Press",
        "target_region": "Chest"
    },
    {
        "description": "An isolation exercise that targets the biceps using cables.",
        "exercise_id": "30",
        "exercise_name": "Cable Curls",
        "target_region": "Biceps"
    },
    {
        "description": "An isolation exercise that targets the biceps using an EZ-bar.",
        "exercise_id": "31",
        "exercise_name": "EZ-Bar Curls",
        "target_region": "Biceps"
    },
    {
        "description": "An isolation exercise that targets the biceps on an incline bench.",
        "exercise_id": "32",
        "exercise_name": "Incline Dumbbell Curls",
        "target_region": "Biceps"
    },
    {
        "description": "A bodyweight exercise that targets the triceps.",
        "exercise_id": "33",
        "exercise_name": "Tricep Dips",
        "target_region": "Triceps"
    },
    {
        "description": "An isolation exercise that targets the triceps using cables.",
        "exercise_id": "34",
        "exercise_name": "Tricep Pushdowns (Cable)",
        "target_region": "Triceps"
    },
    {
        "description": "An isolation exercise that targets the triceps.",
        "exercise_id": "35",
        "exercise_name": "Skull Crushers",
        "target_region": "Triceps"
    },
    {
        "description": "An isolation exercise that targets the triceps.",
        "exercise_id": "36",
        "exercise_name": "Overhead Tricep Extension (Dumbbell or Cable)",
        "target_region": "Triceps"
    },
    {
        "description": "A compound exercise that targets the triceps.",
        "exercise_id": "37",
        "exercise_name": "Close-Grip Bench Press",
        "target_region": "Triceps"
    },
    {
        "description": "An isolation exercise that targets the triceps.",
        "exercise_id": "38",
        "exercise_name": "Tricep Kickbacks",
        "target_region": "Triceps"
    },
    {
        "description": "An isolation exercise that targets the triceps.",
        "exercise_id": "39",
        "exercise_name": "Single-Arm Tricep Extension",
        "target_region": "Triceps"
    },
    {
        "description": "An isolation exercise that targets the chest muscles.",
        "exercise_id": "4",
        "exercise_name": "Chest Fly (Machine or Dumbbell)",
        "target_region": "Chest"
    },
    {
        "description": "An isolation exercise that targets the triceps using a rope attachment.",
        "exercise_id": "40",
        "exercise_name": "Rope Pushdowns",
        "target_region": "Triceps"
    },
    {
        "description": "A compound exercise that targets the quads, glutes, and hamstrings.",
        "exercise_id": "41",
        "exercise_name": "Squats (Barbell or Dumbbell)",
        "target_region": "Legs"
    },
    {
        "description": "A compound machine exercise that targets the quads, glutes, and hamstrings.",
        "exercise_id": "42",
        "exercise_name": "Leg Press",
        "target_region": "Legs"
    },
    {
        "description": "A compound exercise that targets the quads, glutes, and hamstrings.",
        "exercise_id": "43",
        "exercise_name": "Lunges (Walking or Stationary)",
        "target_region": "Legs"
    },
    {
        "description": "An isolation exercise that targets the quads.",
        "exercise_id": "44",
        "exercise_name": "Leg Extensions",
        "target_region": "Legs"
    },
    {
        "description": "An isolation exercise that targets the hamstrings.",
        "exercise_id": "45",
        "exercise_name": "Leg Curls (Hamstring Curls)",
        "target_region": "Legs"
    },
    {
        "description": "A compound exercise that targets the hamstrings and glutes.",
        "exercise_id": "46",
        "exercise_name": "Romanian Deadlifts",
        "target_region": "Legs"
    },
    {
        "description": "An isolation exercise that targets the calf muscles.",
        "exercise_id": "47",
        "exercise_name": "Calf Raises",
        "target_region": "Legs"
    },
    {
        "description": "A compound exercise that targets the quads, glutes, and hamstrings.",
        "exercise_id": "48",
        "exercise_name": "Bulgarian Split Squats",
        "target_region": "Legs"
    },
    {
        "description": "An isometric core exercise that targets the abs and lower back.",
        "exercise_id": "49",
        "exercise_name": "Planks",
        "target_region": "Abs"
    },
    {
        "description": "A bodyweight exercise that targets the chest, shoulders, and triceps.",
        "exercise_id": "5",
        "exercise_name": "Push-Ups",
        "target_region": "Chest"
    },
    {
        "description": "An exercise that targets the obliques and abs.",
        "exercise_id": "50",
        "exercise_name": "Russian Twists",
        "target_region": "Abs"
    },
    {
        "description": "An exercise that targets the lower abs.",
        "exercise_id": "51",
        "exercise_name": "Leg Raises",
        "target_region": "Abs"
    },
    {
        "description": "An exercise that targets the abs and obliques.",
        "exercise_id": "52",
        "exercise_name": "Bicycle Crunches",
        "target_region": "Abs"
    },
    {
        "description": "An exercise that targets the entire core.",
        "exercise_id": "53",
        "exercise_name": "Ab Rollouts",
        "target_region": "Abs"
    },
    {
        "description": "An exercise that targets the lower abs.",
        "exercise_id": "54",
        "exercise_name": "Hanging Knee Raises",
        "target_region": "Abs"
    },
    {
        "description": "An exercise that targets the abs.",
        "exercise_id": "55",
        "exercise_name": "Sit-Ups",
        "target_region": "Abs"
    },
    {
        "description": "An isolation exercise that targets the chest muscles using cables.",
        "exercise_id": "6",
        "exercise_name": "Cable Crossovers",
        "target_region": "Chest"
    },
    {
        "description": "An isolation machine exercise that targets the chest muscles.",
        "exercise_id": "7",
        "exercise_name": "Pec Deck Machine",
        "target_region": "Chest"
    },
    {
        "description": "A bodyweight exercise that targets the chest, shoulders, and triceps.",
        "exercise_id": "8",
        "exercise_name": "Dips",
        "target_region": "Chest"
    },
    {
        "description": "A bodyweight exercise that targets the upper back and biceps.",
        "exercise_id": "9",
        "exercise_name": "Pull-Ups/Chin-Ups",
        "target_region": "Back"
    }
];

const nutirt = [
    {
        "calorie": 165,
        "name": "Chicken Breast",
        "nut_id": "1",
        "protein": 31
    },
    {
        "calorie": 59,
        "name": "Greek Yogurt",
        "nut_id": "10",
        "protein": 10
    },
    {
        "calorie": 575,
        "name": "Almonds",
        "nut_id": "11",
        "protein": 21
    },
    {
        "calorie": 86,
        "name": "Sweet Potato",
        "nut_id": "12",
        "protein": 2
    },
    {
        "calorie": 179,
        "name": "Tuna",
        "nut_id": "13",
        "protein": 39
    },
    {
        "calorie": 230,
        "name": "Lentils",
        "nut_id": "14",
        "protein": 18
    },
    {
        "calorie": 105,
        "name": "Banana",
        "nut_id": "15",
        "protein": 1
    },
    {
        "calorie": 120,
        "name": "Cottage Cheese",
        "nut_id": "16",
        "protein": 12
    },
    {
        "calorie": 188,
        "name": "Peanut Butter",
        "nut_id": "17",
        "protein": 8
    },
    {
        "calorie": 69,
        "name": "Whole Wheat Bread",
        "nut_id": "18",
        "protein": 4
    },
    {
        "calorie": 135,
        "name": "Turkey Breast",
        "nut_id": "19",
        "protein": 30
    },
    {
        "calorie": 216,
        "name": "Brown Rice",
        "nut_id": "2",
        "protein": 5
    },
    {
        "calorie": 85,
        "name": "Blueberries",
        "nut_id": "20",
        "protein": 1
    },
    {
        "calorie": 250,
        "name": "Beef Steak",
        "nut_id": "21",
        "protein": 26
    },
    {
        "calorie": 110,
        "name": "Quorn",
        "nut_id": "22",
        "protein": 15
    },
    {
        "calorie": 206,
        "name": "Salmon Fillet",
        "nut_id": "3",
        "protein": 22
    },
    {
        "calorie": 222,
        "name": "Quinoa",
        "nut_id": "4",
        "protein": 8
    },
    {
        "calorie": 78,
        "name": "Eggs",
        "nut_id": "5",
        "protein": 6
    },
    {
        "calorie": 23,
        "name": "Spinach",
        "nut_id": "6",
        "protein": 2
    },
    {
        "calorie": 160,
        "name": "Avocado",
        "nut_id": "7",
        "protein": 2
    },
    {
        "calorie": 55,
        "name": "Broccoli",
        "nut_id": "8",
        "protein": 4
    },
    {
        "calorie": 145,
        "name": "Oatmeal",
        "nut_id": "9",
        "protein": 6
    }
];

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    // localStorage.clear();

    const [globalVariable, setGlobalVariable] = useState<string>(
        localStorage.getItem("globalVariable") || "initialValue"
    );
    const [user, setUser] = useState<UserModel | undefined>(
        localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : undefined
    );
    const [exercises, setExercises] = useState<ExerciseModel[]>(
        localStorage.getItem("exercises") ? JSON.parse(localStorage.getItem("exercises")!) : exerc
    );
    const [nutritions, setNutritions] = useState<NutritionModel[]>(
        localStorage.getItem("nutritions") ? JSON.parse(localStorage.getItem("nutritions")!) : nutirt
    );

    useEffect(() => {
        if (globalVariable)
            localStorage.setItem("globalVariable", globalVariable);
    }, [globalVariable]);

    useEffect(() => {
        if (user)
            localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        if (exercises)
            localStorage.setItem("exercises", JSON.stringify(exercises));
    }, [exercises]);

    useEffect(() => {
        if (nutritions)
            localStorage.setItem("nutritions", JSON.stringify(nutritions));
    }, [nutritions]);

    return (
        <GlobalContext.Provider value={{ globalVariable, setGlobalVariable, setUser, setExercises, user, exercises, setNutritions, nutritions }}>
            {children}
        </GlobalContext.Provider>
    );
};
