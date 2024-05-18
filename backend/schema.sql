CREATE DATABASE IF NOT EXISTS fitnesstrackerdb;

USE fitnesstrackerdb;

CREATE TABLE User (
    user_id VARCHAR(36) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(40),
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    PRIMARY KEY(user_id)
);

CREATE TABLE Trainer (
    trainer_id VARCHAR(36) NOT NULL,
    gender VARCHAR(20),
    fee INT,
    description VARCHAR(255),
    specialization VARCHAR(20),
    experience VARCHAR(255),
    ratings INT,
    PRIMARY KEY(trainer_id),
    FOREIGN KEY(trainer_id) references User(user_id)
);

CREATE TABLE Admin (
    admin_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(admin_id),
    FOREIGN KEY(admin_id) references User(user_id)
);

CREATE TABLE FitnessEnthusiast (
    fe_id VARCHAR(36) NOT NULL,
    weight INT,
    height INT,
    age INT,
    gender VARCHAR(20),
    PRIMARY KEY(fe_id),
    FOREIGN KEY(fe_id) references User(user_id)
);

CREATE TABLE Payment (
    payment_id VARCHAR(36) NOT NULL,
    amount INT NOT NULL,
    date_time DATETIME,
    fe_id VARCHAR(36) NOT NULL,
    trainer_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(payment_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id),
    FOREIGN KEY(trainer_id) references Trainer(trainer_id)
);

CREATE TABLE FitnessGoal (
    goal_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    name VARCHAR(20),
    target_region VARCHAR(20),
    calorie INT,
    start_time DATETIME,
    duration INT,
    PRIMARY KEY(goal_id, fe_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id)
);

CREATE TABLE PastAchievement (
    ach_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    name VARCHAR(20),
    target_region VARCHAR(20),
    calorie INT,
    start_time DATETIME,
    duration INT,
    PRIMARY KEY(ach_id, fe_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id)
);

CREATE TABLE Exercise (
    exercise_id VARCHAR(36) NOT NULL,
    exercise_name VARCHAR(255),
    target_region VARCHAR(255),
    description VARCHAR(255),
    PRIMARY KEY(exercise_id)
);

CREATE TABLE Challenge (
    challenge_id VARCHAR(36) NOT NULL,
    name VARCHAR(255),
    prize VARCHAR(255),
    start_date INT,
    end_date INT,
    exercise_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(challenge_id),
    FOREIGN KEY(exercise_id) references Exercise(exercise_id)
);

CREATE TABLE Recommendation (
    recommendation_id VARCHAR(36) NOT NULL,
    message VARCHAR(255),
    PRIMARY KEY(recommendation_id)
);

CREATE TABLE TrainerSession (
    session_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36),
    trainer_id VARCHAR(36) NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    availability INT,
    PRIMARY KEY(session_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id),
    FOREIGN KEY(trainer_id) references Trainer(trainer_id)
);

CREATE TABLE Chat (
    chat_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(36) NOT NULL,
    start_date DATETIME,
    PRIMARY KEY(chat_id, session_id),
    FOREIGN KEY(session_id) references TrainerSession(session_id)
);

CREATE TABLE Message (
    message_id VARCHAR(36) NOT NULL,
    chat_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(36) NOT NULL,
    content VARCHAR(255),
    date_time DATETIME,
    owner_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(
        message_id,
        chat_id,
        session_id
    ),
    FOREIGN KEY(chat_id, session_id) references Chat(chat_id, session_id)
);

CREATE TABLE NutritionPlan (
    plan_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    name VARCHAR(50),
    content VARCHAR(255),
    PRIMARY KEY(plan_id, fe_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id)
);

CREATE TABLE NutritionLog (
    nutlog_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    date_time DATETIME,
    PRIMARY KEY(nutlog_id, fe_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id)
);

CREATE TABLE Nutrition (
    nut_id VARCHAR(36),
    name VARCHAR(50),
    calorie INT,
    protein INT,
    PRIMARY KEY(nut_id)
);

CREATE TABLE ExerciseLog (
    exlog_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    date_time DATETIME,
    PRIMARY KEY(exlog_id, fe_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id)
);

CREATE TABLE WorkoutLog (
    workoutlog_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    date_time DATETIME,
    PRIMARY KEY(workoutlog_id, fe_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id)
);

CREATE TABLE WorkoutSession (
    workout_id VARCHAR(36) NOT NULL,
    trainer_id VARCHAR(36),
    name VARCHAR(50),
    audience VARCHAR(20),
    equipments VARCHAR(255),
    description VARCHAR(255),
    PRIMARY KEY(workout_id, trainer_id),
    FOREIGN KEY(trainer_id) references Trainer(trainer_id)
);

CREATE TABLE Equipment (
    equipment_id VARCHAR(36) NOT NULL,
    name VARCHAR(50),
    PRIMARY KEY(equipment_id)
);

CREATE TABLE has_workout (
    fe_id VARCHAR(36) NOT NULL,
    workout_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(fe_id, workout_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id),
    FOREIGN KEY(workout_id) references WorkoutSession(workout_id)
);

CREATE TABLE has_equipment (
    workout_id VARCHAR(36) NOT NULL,
    equipment_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(workout_id, equipment_id),
    FOREIGN KEY(workout_id) references WorkoutSession(workout_id),
    FOREIGN KEY(equipment_id) references Equipment(equipment_id)
);

CREATE TABLE keeps_workout (
    workout_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36),
    trainer_id VARCHAR(36),
    workoutlog_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(workout_id, fe_id, trainer_id, workoutlog_id),
    FOREIGN KEY(workout_id, trainer_id) references WorkoutSession(workout_id, trainer_id),
    FOREIGN KEY(workoutlog_id, fe_id) references WorkoutLog(workoutlog_id, fe_id)
);

CREATE TABLE consists_of_exercise (
    workout_id VARCHAR(36),
    fe_id VARCHAR(36),
    trainer_id VARCHAR(36),
    exercise_id VARCHAR(36),
    PRIMARY KEY(workout_id, fe_id, trainer_id, exercise_id),
    FOREIGN KEY(workout_id, trainer_id) references WorkoutSession(workout_id, trainer_id),
    FOREIGN KEY(exercise_id) references Exercise(exercise_id)
);

CREATE TABLE keeps_exercise (
    exlog_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    exercise_id VARCHAR(36) NOT NULL,
    set_count INT,
    repetition INT,
    PRIMARY KEY(exlog_id, fe_id, exercise_id),
    FOREIGN KEY(exlog_id, fe_id) references ExerciseLog(exlog_id, fe_id),
    FOREIGN KEY(exercise_id) references Exercise(exercise_id)
);

CREATE TABLE recieves_recom (
    recommendation_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(recommendation_id, fe_id),
    FOREIGN KEY(recommendation_id) references Recommendation(recommendation_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id)
);

CREATE TABLE keeps_nutrition (
    nut_id VARCHAR(36) NOT NULL,
    nutlog_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    portion INT,
    PRIMARY KEY(nut_id, nutlog_id, fe_id),
    FOREIGN KEY(nut_id) references Nutrition(nut_id),
    FOREIGN KEY(nutlog_id, fe_id) references NutritionLog(nutlog_id, fe_id)
);

CREATE TABLE enters_challenge (
    fe_id VARCHAR(36) NOT NULL,
    challenge_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(fe_id, challenge_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id),
    FOREIGN KEY(challenge_id) references Challenge(challenge_id)
);

CREATE TABLE consists_of_nut (
    nut_id VARCHAR(36) NOT NULL,
    plan_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    portion INT,
    PRIMARY KEY(nut_id, plan_id, fe_id),
    FOREIGN KEY(nut_id) references Nutrition(nut_id),
    FOREIGN KEY(plan_id, fe_id) references NutritionPlan(plan_id, fe_id)
);

-- Inserting values into the User table
INSERT INTO
    User (user_id, email, password, first_name, middle_name, last_name)
VALUES
    (
        '1',
        'orhunaysan3b@gmail.com',
        'password1',
        'orhun',
        'slm',
        'aysan'
    ),
    (
        '2',
        'egekaraahmetoglu2003@gmail.com',
        'password2',
        'ege',
        'slm',
        'karaahmetoglu'
    ),
    (
        '3',
        'serhatmerak@gmail.com',
        'password3',
        'serhat',
        'slm',
        'merak'
    ),
    (
        '4',
        'mirzaatalar@gmail.com',
        'password4',
        'mirza',
        'slm',
        'atalar'
    ),
    (
        '5',
        'kaanturkoglu@gmail.com',
        'password5',
        'kaan',
        'slm',
        'turkoglu'
    );
    
-- Inserting values into the Trainer table
INSERT INTO
    Trainer (
        trainer_id,
        gender,
        fee,
        description,
        specialization,
        experience,
        ratings
    )
VALUES
    (
        1,
        'Male',
        50,
        'Certified personal trainer with 5 years of experience',
        'Weightlifting',
        '5 years',
        4
    ),
    (
        2,
        'Male',
        60,
        'Experienced yoga instructor specializing in Hatha yoga',
        'Yoga',
        '8 years',
        5
    );

-- Inserting values into the FitnessEnthusiast table
INSERT INTO
    FitnessEnthusiast (fe_id, weight, height, age, gender)
VALUES
    (3, 70, 175, 30, 'Male'),
    (4, 55, 160, 25, 'Female');

-- INSERT INTO Admin (admin_id) 
-- VALUES(5);

-- -- Inserting values into the Payment table
-- INSERT INTO
--     Payment (payment_id, amount, date_time, fe_id, trainer_id)
-- VALUES
--     (1, 50, '2024-05-13', 3, 1),
--     (2, 60, '2024-05-13', 4, 2);

-- INSERT INTO FitnessGoal (goal_id, fe_id, type, value, time_interval) 
-- VALUES 
-- (1, 3, 'Weight Loss', '10 kg', 3),
-- (2, 4, 'Muscle Gain', '5 kg', 6);

-- -- Inserting values into the PastAchievement table
-- INSERT INTO PastAchievement (ach_id, fe_id, goal_id) 
-- VALUES 
-- (1, 3, 1),
-- (2, 4, 2);

-- -- Inserting values into the Challenge table
-- INSERT INTO Challenge (challenge_id, name, prize, start_date, end_date, exercise_id) 
-- VALUES 
-- (1, 'Summer Fitness Challenge', 'Free gym membership', '2024-06-01', '2024-08-31', 1),
-- (2, 'Yoga Wellness Challenge', 'Wellness package', '2024-07-01', '2024-07-31', 2);

-- -- Inserting values into the Recommendation table
-- INSERT INTO Recommendation (recommendation_id, message) 
-- VALUES 
-- (1, 'Try incorporating more protein into your diet'),
-- (2, 'Consider adding strength training to your workout routine');

-- Inserting values into the TrainerSession table
INSERT INTO TrainerSession (session_id, fe_id, trainer_id, start_time, end_time) 
VALUES 
(1, 3, 1, '2024-05-13 10:00:00', '2024-05-13 11:00:00'),
(2, 4, 2, '2024-05-14 15:00:00', '2024-05-14 16:00:00');

INSERT INTO Chat (chat_id, session_id, start_date) 
VALUES 
(1, 1, '2024-05-13'),
(2, 2, '2024-05-14');

-- -- Inserting values into the Message table
-- INSERT INTO Message (message_id, chat_id, session_id, fe_id, trainer_id, content, date_time, owner) 
-- VALUES 
-- (1, 1, 1, 3, 1, 'Hi, how can I help you today?', '2024-05-13 10:05:00', 'Trainer'),
-- (2, 1, 1, 3, 1, 'I have some questions about my workout plan', '2024-05-13 10:10:00', 'Fitness Enthusiast');

-- -- Inserting values into the NutritionPlan table
-- INSERT INTO NutritionPlan (plan_id, fe_id, name, content) 
-- VALUES 
-- (1, 3, 'Muscle Gain Plan', 'High-protein diet with moderate carbs and fats'),
-- (2, 4, 'Weight Loss Plan', 'Balanced diet with calorie deficit');

-- -- Inserting values into the NutritionLog table
-- INSERT INTO NutritionLog (nutlog_id, fe_id, date_time) 
-- VALUES 
-- (1, 3, '2024-05-13'),
-- (2, 4, '2024-05-14');

-- -- Inserting values into the Nutrition table
-- INSERT INTO Nutrition (nut_id, name, calorie, protein) 
-- VALUES 
-- (1, 'Chicken Breast', 165, 31),
-- (2, 'Brown Rice', 216, 5);

-- Insert Chest Exercises
INSERT INTO Exercise (exercise_id, exercise_name, target_region, description) VALUES
('1', 'Bench Press (Barbell or Dumbbell)', 'Chest', 'A compound exercise that targets the chest, shoulders, and triceps.'),
('2', 'Incline Bench Press', 'Chest', 'A variation of the bench press that targets the upper chest.'),
('3', 'Decline Bench Press', 'Chest', 'A variation of the bench press that targets the lower chest.'),
('4', 'Chest Fly (Machine or Dumbbell)', 'Chest', 'An isolation exercise that targets the chest muscles.'),
('5', 'Push-Ups', 'Chest', 'A bodyweight exercise that targets the chest, shoulders, and triceps.'),
('6', 'Cable Crossovers', 'Chest', 'An isolation exercise that targets the chest muscles using cables.'),
('7', 'Pec Deck Machine', 'Chest', 'An isolation machine exercise that targets the chest muscles.'),
('8', 'Dips', 'Chest', 'A bodyweight exercise that targets the chest, shoulders, and triceps.');

-- Insert Back Exercises
INSERT INTO Exercise (exercise_id, exercise_name, target_region, description) VALUES
('9', 'Pull-Ups/Chin-Ups', 'Back', 'A bodyweight exercise that targets the upper back and biceps.'),
('10', 'Deadlifts', 'Back', 'A compound exercise that targets the back, glutes, and hamstrings.'),
('11', 'Bent Over Rows (Barbell or Dumbbell)', 'Back', 'A compound exercise that targets the middle back and lats.'),
('12', 'Lat Pulldowns', 'Back', 'An exercise that targets the latissimus dorsi muscles.'),
('13', 'Seated Row (Cable)', 'Back', 'A compound exercise that targets the middle back.'),
('14', 'T-Bar Rows', 'Back', 'A compound exercise that targets the middle back and lats.'),
('15', 'Single-Arm Dumbbell Row', 'Back', 'An exercise that targets the lats and middle back.'),
('16', 'Face Pulls', 'Back', 'An exercise that targets the rear deltoids and upper back.');

-- Insert Shoulder Exercises
INSERT INTO Exercise (exercise_id, exercise_name, target_region, description) VALUES
('17', 'Overhead Press (Barbell or Dumbbell)', 'Shoulders', 'A compound exercise that targets the shoulder muscles.'),
('18', 'Lateral Raises', 'Shoulders', 'An isolation exercise that targets the side deltoids.'),
('19', 'Front Raises', 'Shoulders', 'An isolation exercise that targets the front deltoids.'),
('20', 'Reverse Pec Deck (Rear Delt Fly)', 'Shoulders', 'An isolation exercise that targets the rear deltoids.'),
('21', 'Arnold Press', 'Shoulders', 'A variation of the overhead press that targets all three heads of the deltoid.'),
('22', 'Upright Rows', 'Shoulders', 'An exercise that targets the shoulder muscles and upper traps.'),
('23', 'Cable Lateral Raises', 'Shoulders', 'An isolation exercise that targets the side deltoids using cables.'),
('24', 'Shrugs', 'Shoulders', 'An exercise that targets the upper trapezius muscles.');

-- Insert Bicep Exercises
INSERT INTO Exercise (exercise_id, exercise_name, target_region, description) VALUES
('25', 'Barbell Curls', 'Biceps', 'A compound exercise that targets the bicep muscles.'),
('26', 'Dumbbell Curls', 'Biceps', 'An isolation exercise that targets the bicep muscles.'),
('27', 'Hammer Curls', 'Biceps', 'An exercise that targets the biceps and forearms.'),
('28', 'Preacher Curls', 'Biceps', 'An isolation exercise that targets the biceps using a preacher bench.'),
('29', 'Concentration Curls', 'Biceps', 'An isolation exercise that targets the biceps.'),
('30', 'Cable Curls', 'Biceps', 'An isolation exercise that targets the biceps using cables.'),
('31', 'EZ-Bar Curls', 'Biceps', 'An isolation exercise that targets the biceps using an EZ-bar.'),
('32', 'Incline Dumbbell Curls', 'Biceps', 'An isolation exercise that targets the biceps on an incline bench.');

-- Insert Tricep Exercises
INSERT INTO Exercise (exercise_id, exercise_name, target_region, description) VALUES
('33', 'Tricep Dips', 'Triceps', 'A bodyweight exercise that targets the triceps.'),
('34', 'Tricep Pushdowns (Cable)', 'Triceps', 'An isolation exercise that targets the triceps using cables.'),
('35', 'Skull Crushers', 'Triceps', 'An isolation exercise that targets the triceps.'),
('36', 'Overhead Tricep Extension (Dumbbell or Cable)', 'Triceps', 'An isolation exercise that targets the triceps.'),
('37', 'Close-Grip Bench Press', 'Triceps', 'A compound exercise that targets the triceps.'),
('38', 'Tricep Kickbacks', 'Triceps', 'An isolation exercise that targets the triceps.'),
('39', 'Single-Arm Tricep Extension', 'Triceps', 'An isolation exercise that targets the triceps.'),
('40', 'Rope Pushdowns', 'Triceps', 'An isolation exercise that targets the triceps using a rope attachment.');

-- Insert Leg Exercises
INSERT INTO Exercise (exercise_id, exercise_name, target_region, description) VALUES
('41', 'Squats (Barbell or Dumbbell)', 'Legs', 'A compound exercise that targets the quads, glutes, and hamstrings.'),
('42', 'Leg Press', 'Legs', 'A compound machine exercise that targets the quads, glutes, and hamstrings.'),
('43', 'Lunges (Walking or Stationary)', 'Legs', 'A compound exercise that targets the quads, glutes, and hamstrings.'),
('44', 'Leg Extensions', 'Legs', 'An isolation exercise that targets the quads.'),
('45', 'Leg Curls (Hamstring Curls)', 'Legs', 'An isolation exercise that targets the hamstrings.'),
('46', 'Romanian Deadlifts', 'Legs', 'A compound exercise that targets the hamstrings and glutes.'),
('47', 'Calf Raises', 'Legs', 'An isolation exercise that targets the calf muscles.'),
('48', 'Bulgarian Split Squats', 'Legs', 'A compound exercise that targets the quads, glutes, and hamstrings.');

-- Insert Abs Exercises
INSERT INTO Exercise (exercise_id, exercise_name, target_region, description) VALUES
('49', 'Planks', 'Abs', 'An isometric core exercise that targets the abs and lower back.'),
('50', 'Russian Twists', 'Abs', 'An exercise that targets the obliques and abs.'),
('51', 'Leg Raises', 'Abs', 'An exercise that targets the lower abs.'),
('52', 'Bicycle Crunches', 'Abs', 'An exercise that targets the abs and obliques.'),
('53', 'Ab Rollouts', 'Abs', 'An exercise that targets the entire core.'),
('54', 'Hanging Knee Raises', 'Abs', 'An exercise that targets the lower abs.'),
('55', 'Sit-Ups', 'Abs', 'An exercise that targets the abs.');

-- Inserting values into the ExerciseLog table
INSERT INTO ExerciseLog (exlog_id, fe_id, date_time) 
VALUES 
(1, 3, '2024-05-13'),
(2, 4, '2024-05-14');

INSERT INTO keeps_exercise (exlog_id, fe_id, exercise_id, set_count, repetition)
VALUES 
(1, 3, 1, 3, 10),
(2, 4, 2, 1, 5);

INSERT INTO Equipment (equipment_id, name) VALUES
('1', 'Barbell'),
('2', 'Dumbbell'),
('3', 'Bench'),
('4', 'Squat Rack'),
('5', 'Cable Machine'),
('6', 'Leg Press Machine'),
('7', 'Dip Station'),
('8', 'Pull-Up Bar'),
('9', 'Yoga Mat'),
(10, 'Resistance Bands');

-- -- Inserting values into the WorkoutLog table
-- INSERT INTO WorkoutLog (workoutlog_id, fe_id, date_time) 
-- VALUES 
-- (1, 3, '2024-05-13'),
-- (2, 4, '2024-05-14');

-- -- Inserting values into the WorkoutSession table
-- INSERT INTO WorkoutSession (workout_id, fe_id, trainer_id, name, audience, description, duration, availability) 
-- VALUES 
-- (1, 3, 1, 'Strength Training', 'Beginner', 'Introduction to basic strength training exercises', 60, 1),
-- (2, 4, 2, 'Yoga Flow', 'Intermediate', 'Dynamic yoga flow sequence for flexibility and strength', 75, 1);

-- -- Inserting values into the Equipment table
-- INSERT INTO Equipment (workout_id, fe_id, trainer_id, equipment) 
-- VALUES 
-- (1, 3, 1, 'Barbell'),
-- (2, 4, 2, 'Yoga Mat');

-- -- Inserting values into the keeps_workout table
-- INSERT INTO keeps_workout (workout_id, fe_id, trainer_id, workoutlog_id) 
-- VALUES 
-- (1, 3, 1, 1),
-- (2, 4, 2, 2);