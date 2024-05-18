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
    fe_id VARCHAR(36) NOT NULL,
    trainer_id VARCHAR(36) NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    PRIMARY KEY(session_id, fe_id, trainer_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id),
    FOREIGN KEY(trainer_id) references Trainer(trainer_id)
);

CREATE TABLE Chat (
    chat_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    trainer_id VARCHAR(36) NOT NULL,
    start_date DATETIME,
    PRIMARY KEY(chat_id, session_id, fe_id, trainer_id),
    FOREIGN KEY(session_id, fe_id, trainer_id) references TrainerSession(session_id, fe_id, trainer_id)
);

CREATE TABLE Message (
    message_id VARCHAR(36) NOT NULL,
    chat_id VARCHAR(36) NOT NULL,
    session_id VARCHAR(36) NOT NULL,
    fe_id VARCHAR(36) NOT NULL,
    trainer_id VARCHAR(36) NOT NULL,
    content VARCHAR(255),
    date_time DATETIME,
    owner_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(
        message_id,
        chat_id,
        session_id,
        fe_id,
        trainer_id
    ),
    FOREIGN KEY(chat_id, session_id, fe_id, trainer_id) references Chat(chat_id, session_id, fe_id, trainer_id)
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
    -- equipments VARCHAR(255) ARRAY,
    description VARCHAR(255),
    PRIMARY KEY(workout_id, trainer_id),
    FOREIGN KEY(trainer_id) references Trainer(trainer_id)
);

CREATE TABLE Equipment (
    workout_id VARCHAR(36) NOT NULL,
    trainer_id VARCHAR(36) NOT NULL,
    equipment VARCHAR(50),
    PRIMARY KEY(workout_id, trainer_id, equipment),
    FOREIGN KEY(workout_id, trainer_id) references WorkoutSession(workout_id, trainer_id)
);

CREATE TABLE has_workout (
    fe_id VARCHAR(36) NOT NULL,
    workout_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(fe_id, workout_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id),
    FOREIGN KEY(workout_id) references WorkoutSession(workout_id)
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

-- Inserting values into the Chat table
INSERT INTO Chat (chat_id, session_id, fe_id, trainer_id, start_date) 
VALUES 
(1, 1, 3, 1, '2024-05-13'),
(2, 2, 4, 2, '2024-05-14');

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

-- Inserting values into the ExerciseLog table
INSERT INTO ExerciseLog (exlog_id, fe_id, date_time) 
VALUES 
(1, 3, '2024-05-13'),
(2, 4, '2024-05-14');

-- Inserting values into the Exercise table
INSERT INTO Exercise (exercise_id, target_region, description) 
VALUES 
(1, 'Upper Body', 'Bench Press'),
(2, 'Flexibility', 'Forward Fold');

INSERT INTO keeps_exercise (exlog_id, fe_id, exercise_id, set_count, repetition)
VALUES 
(1, 3, 1, 3, 10),
(2, 4, 2, 1, 5);

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