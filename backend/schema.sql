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
    equipment VARCHAR(255),
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
    workout_id VARCHAR(36) NOT NULL,
    date_time DATETIME,
    PRIMARY KEY(workoutlog_id, fe_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id)
);

CREATE TABLE WorkoutSession (
    workout_id VARCHAR(36) NOT NULL,
    trainer_id VARCHAR(36),
    name VARCHAR(50),
    audience VARCHAR(20),
    description VARCHAR(255),
    PRIMARY KEY(workout_id)
);

CREATE TABLE has_workout (
    fe_id VARCHAR(36) NOT NULL,
    workout_id VARCHAR(36) NOT NULL,
    trainer_id VARCHAR(36),
    PRIMARY KEY(fe_id, workout_id),
    FOREIGN KEY(fe_id) references FitnessEnthusiast(fe_id),
    FOREIGN KEY(workout_id) references WorkoutSession(workout_id)
);

CREATE TABLE consists_of_exercise (
    workout_id VARCHAR(36),
    trainer_id VARCHAR(36),
    exercise_id VARCHAR(36),
    set_count INT,
    repetition INT,
    PRIMARY KEY(workout_id, exercise_id),
    FOREIGN KEY(workout_id) references WorkoutSession(workout_id),
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

-- Inserting values into the Recommendation table
INSERT INTO Recommendation (recommendation_id, message) 
VALUES 
(3, 'Incorporate a variety of fruits and vegetables into your daily meals for essential vitamins and minerals'),
(4, 'Stay hydrated by drinking plenty of water throughout the day'),
(5, 'Limit processed foods and opt for whole, nutrient-dense options instead'),
(6, 'Include complex carbohydrates like whole grains, oats, and sweet potatoes in your diet for sustained energy levels'),
(7, 'Prioritize getting enough sleep each night to support muscle recovery and overall well-being'),
(8, 'Engage in regular cardiovascular exercise to improve heart health and endurance'),
(9, 'Reduce your intake of added sugars and sugary beverages to support weight management and prevent energy crashes'),
(10, 'Incorporate healthy fats like avocados, nuts, and olive oil into your diet for brain function and satiety'),
(11, 'Practice mindful eating by paying attention to hunger and fullness cues, rather than eating out of habit or emotion'),
(12, 'Experiment with different types of physical activity to find what you enjoy most, whether its hiking, dancing, or swimming'),
(13, 'Consider working with a registered dietitian or nutritionist to create a personalized meal plan that meets your specific needs and goals'),
(14, 'Make time for regular stretching or yoga sessions to improve flexibility and reduce the risk of injury'),
(15, 'Limit alcohol consumption, as it can interfere with muscle recovery and disrupt sleep patterns'),
(16, 'Set realistic and achievable fitness goals to stay motivated and track your progress over time'),
(17, 'Practice portion control to avoid overeating and maintain a healthy weight'),
(18, 'Incorporate strength training exercises into your routine to build lean muscle mass and increase metabolism'),
(19, 'Listen to your body and give yourself rest days when needed to prevent burnout and injury'),
(20, 'Stay consistent with your fitness and nutrition habits, but dont be too hard on yourself - progress takes time and patience');


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

-- Inserting values into the Nutrition table
INSERT INTO Nutrition (nut_id, name, calorie, protein) 
VALUES 
(1, 'Chicken Breast', 165, 31),
(2, 'Brown Rice', 216, 5),
(3, 'Salmon Fillet', 206, 22),
(4, 'Quinoa', 222, 8),
(5, 'Eggs', 78, 6),
(6, 'Spinach', 23, 2),
(7, 'Avocado', 160, 2),
(8, 'Broccoli', 55, 4),
(9, 'Oatmeal', 145, 6),
(10, 'Greek Yogurt', 59, 10),
(11, 'Almonds', 575, 21),
(12, 'Sweet Potato', 86, 2),
(13, 'Tuna', 179, 39),
(14, 'Lentils', 230, 18),
(15, 'Banana', 105, 1),
(16, 'Cottage Cheese', 120, 12),
(17, 'Peanut Butter', 188, 8),
(18, 'Whole Wheat Bread', 69, 4),
(19, 'Turkey Breast', 135, 30),
(20, 'Blueberries', 85, 1),
(21, 'Beef Steak', 250, 26),
(22, 'Quorn', 110, 15);

-- Insert Chest Exercises
INSERT INTO Exercise (exercise_id, exercise_name, equipment, target_region, description) VALUES
('1', 'Bench Press', 'Barbell', 'Chest', 'A compound exercise that targets the chest, shoulders, and triceps.'),
('2', 'Incline Bench Press', 'Barbell', 'Chest', 'A variation of the bench press that targets the upper chest.'),
('3', 'Decline Bench Press', 'Barbell', 'Chest', 'A variation of the bench press that targets the lower chest.'),
('4', 'Chest Fly', 'Dumbbell', 'Chest', 'An isolation exercise that targets the chest muscles.'),
('5', 'Push-Ups', 'Bodyweight', 'Chest', 'A bodyweight exercise that targets the chest, shoulders, and triceps.'),
('6', 'Cable Crossovers', 'Cable', 'Chest', 'An isolation exercise that targets the chest muscles using cables.'),
('7', 'Pec Deck Machine', 'Machine', 'Chest', 'An isolation machine exercise that targets the chest muscles.'),
('8', 'Dips', 'Bodyweight', 'Chest', 'A bodyweight exercise that targets the chest, shoulders, and triceps.');

-- Insert Back Exercises
INSERT INTO Exercise (exercise_id, exercise_name, equipment, target_region, description) VALUES
('9', 'Pull-Ups/Chin-Ups', 'Bodyweight', 'Back', 'A bodyweight exercise that targets the upper back and biceps.'),
('10', 'Deadlifts', 'Barbell', 'Back', 'A compound exercise that targets the back, glutes, and hamstrings.'),
('11', 'Bent Over Rows', 'Barbell', 'Back', 'A compound exercise that targets the middle back and lats.'),
('12', 'Lat Pulldowns', 'Machine', 'Back', 'An exercise that targets the latissimus dorsi muscles.'),
('13', 'Seated Row', 'Cable', 'Back', 'A compound exercise that targets the middle back.'),
('14', 'T-Bar Rows', 'Machine', 'Back', 'A compound exercise that targets the middle back and lats.'),
('15', 'Single-Arm Dumbbell Row', 'Dumbbell', 'Back', 'An exercise that targets the lats and middle back.'),
('16', 'Face Pulls', 'Cable', 'Back', 'An exercise that targets the rear deltoids and upper back.');

-- Insert Shoulder Exercises
INSERT INTO Exercise (exercise_id, exercise_name, equipment, target_region, description) VALUES
('17', 'Overhead Press', 'Barbell', 'Shoulders', 'A compound exercise that targets the shoulder muscles.'),
('18', 'Lateral Raises', 'Dumbbell', 'Shoulders', 'An isolation exercise that targets the side deltoids.'),
('19', 'Front Raises', 'Dumbbell', 'Shoulders', 'An isolation exercise that targets the front deltoids.'),
('20', 'Reverse Pec Deck', 'Machine', 'Shoulders', 'An isolation exercise that targets the rear deltoids.'),
('21', 'Arnold Press', 'Dumbbell', 'Shoulders', 'A variation of the overhead press that targets all three heads of the deltoid.'),
('22', 'Upright Rows', 'Barbell', 'Shoulders', 'An exercise that targets the shoulder muscles and upper traps.'),
('23', 'Cable Lateral Raises', 'Cable', 'Shoulders', 'An isolation exercise that targets the side deltoids using cables.'),
('24', 'Shrugs', 'Dumbbell', 'Shoulders', 'An exercise that targets the upper trapezius muscles.');

-- Insert Bicep Exercises
INSERT INTO Exercise (exercise_id, exercise_name, equipment, target_region, description) VALUES
('25', 'Barbell Curls', 'Barbell', 'Biceps', 'A compound exercise that targets the bicep muscles.'),
('26', 'Dumbbell Curls', 'Dumbbell', 'Biceps', 'An isolation exercise that targets the bicep muscles.'),
('27', 'Hammer Curls', 'Dumbbell', 'Biceps', 'An exercise that targets the biceps and forearms.'),
('28', 'Preacher Curls', 'Barbell', 'Biceps', 'An isolation exercise that targets the biceps using a preacher bench.'),
('29', 'Concentration Curls', 'Dumbbell', 'Biceps', 'An isolation exercise that targets the biceps.'),
('30', 'Cable Curls', 'Cable', 'Biceps', 'An isolation exercise that targets the biceps using cables.'),
('31', 'EZ-Bar Curls', 'EZ-Bar', 'Biceps', 'An isolation exercise that targets the biceps using an EZ-bar.'),
('32', 'Incline Dumbbell Curls', 'Dumbbell', 'Biceps', 'An isolation exercise that targets the biceps on an incline bench.');

-- Insert Tricep Exercises
INSERT INTO Exercise (exercise_id, exercise_name, equipment, target_region, description) VALUES
('33', 'Tricep Dips', 'Bodyweight', 'Triceps', 'A bodyweight exercise that targets the triceps.'),
('34', 'Tricep Pushdowns', 'Cable', 'Triceps', 'An isolation exercise that targets the triceps using cables.'),
('35', 'Skull Crushers', 'EZ-Bar', 'Triceps', 'An isolation exercise that targets the triceps.'),
('36', 'Overhead Tricep Extension', 'Dumbbell', 'Triceps', 'An isolation exercise that targets the triceps.'),
('37', 'Close-Grip Bench Press', 'Barbell', 'Triceps', 'A compound exercise that targets the triceps.'),
('38', 'Tricep Kickbacks', 'Dumbbell', 'Triceps', 'An isolation exercise that targets the triceps.'),
('39', 'Single-Arm Tricep Extension', 'Dumbbell', 'Triceps', 'An isolation exercise that targets the triceps.'),
('40', 'Rope Pushdowns', 'Cable', 'Triceps', 'An isolation exercise that targets the triceps using a rope attachment.');

-- Insert Leg Exercises
INSERT INTO Exercise (exercise_id, exercise_name, equipment, target_region, description) VALUES
('41', 'Squats', 'Barbell', 'Legs', 'A compound exercise that targets the quads, glutes, and hamstrings.'),
('42', 'Leg Press', 'Machine', 'Legs', 'A compound machine exercise that targets the quads, glutes, and hamstrings.'),
('43', 'Lunges', 'Bodyweight', 'Legs', 'A compound exercise that targets the quads, glutes, and hamstrings.'),
('44', 'Leg Extensions', 'Machine', 'Legs', 'An isolation exercise that targets the quads.'),
('45', 'Leg Curls', 'Machine', 'Legs', 'An isolation exercise that targets the hamstrings.'),
('46', 'Romanian Deadlifts', 'Barbell', 'Legs', 'A compound exercise that targets the hamstrings and glutes.'),
('47', 'Calf Raises', 'Bodyweight', 'Legs', 'An isolation exercise that targets the calf muscles.'),
('48', 'Bulgarian Split Squats', 'Dumbbell', 'Legs', 'A compound exercise that targets the quads, glutes, and hamstrings.');

-- Insert Abs Exercises
INSERT INTO Exercise (exercise_id, exercise_name, equipment, target_region, description) VALUES
('49', 'Planks', 'Bodyweight', 'Abs', 'An isometric core exercise that targets the abs and lower back.'),
('50', 'Russian Twists', 'Bodyweight', 'Abs', 'An exercise that targets the obliques and abs.'),
('51', 'Leg Raises', 'Bodyweight', 'Abs', 'An exercise that targets the lower abs.'),
('52', 'Bicycle Crunches', 'Bodyweight', 'Abs', 'An exercise that targets the abs and obliques.'),
('53', 'Ab Rollouts', 'Ab Roller', 'Abs', 'An exercise that targets the entire core.'),
('54', 'Hanging Knee Raises', 'Bodyweight', 'Abs', 'An exercise that targets the lower abs.'),
('55', 'Sit-Ups', 'Bodyweight', 'Abs', 'An exercise that targets the abs.');

-- Inserting values into the ExerciseLog table
INSERT INTO ExerciseLog (exlog_id, fe_id, date_time) 
VALUES 
(1, 3, '2024-05-13'),
(2, 4, '2024-05-14');

INSERT INTO keeps_exercise (exlog_id, fe_id, exercise_id, set_count, repetition)
VALUES 
(1, 3, 1, 3, 10),
(2, 4, 2, 1, 5);

-- INSERT INTO Equipment (equipment_id, name) VALUES
-- ('1', 'Barbell'),
-- ('2', 'Dumbbell'),
-- ('3', 'Bench'),
-- ('4', 'Squat Rack'),
-- ('5', 'Cable Machine'),
-- ('6', 'Leg Press Machine'),
-- ('7', 'Dip Station'),
-- ('8', 'Pull-Up Bar'),
-- ('9', 'Yoga Mat'),
-- (10, 'Resistance Bands');

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

-- -- Inserting values into the keeps_workout table
-- INSERT INTO keeps_workout (workout_id, fe_id, trainer_id, workoutlog_id) 
-- VALUES 
-- (1, 3, 1, 1),
-- (2, 4, 2, 2);