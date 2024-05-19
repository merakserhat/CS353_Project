from flask import Blueprint, request, jsonify
import MySQLdb.cursors
import uuid
from datetime import datetime, timedelta
from database import connect

workout = Blueprint('workout', __name__, url_prefix='/workout')

@workout.route('/create/trainer', methods=['POST'])
def create_workout_trainer():
    workout_id = str(uuid.uuid4())
    trainer_id = request.json['trainer_id']
    name = request.json['name']
    audience = request.json['audience']
    description = request.json['description']
    duration = request.json['duration']
    intensity = request.json['intensity']
    exercises = request.json['exercises']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM Trainer WHERE trainer_id = %s', (trainer_id,))
    trainer = cursor.fetchone()
    if trainer is None:
        return jsonify({'message': 'Trainer not found!'}), 403
    
    cursor.execute('INSERT INTO WorkoutSession (workout_id, trainer_id, name, audience, description, duration, intensity) VALUES (%s, %s, %s, %s, %s, %s, %s)', (workout_id, trainer_id, name, audience, description, duration, intensity))
    
    for exercise in exercises:
        exercise_id = exercise['exercise_id']
        sets = exercise['sets']
        reps = exercise['reps']
        cursor.execute('INSERT INTO consists_of_exercise (workout_id, trainer_id, exercise_id, set_count, repetition) VALUES (%s, %s, %s, %s, %s)', (workout_id, trainer_id, exercise_id, sets, reps))

    connection.commit()
    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()
    
    workout_id = workout['workout_id']
    cursor.execute('SELECT * FROM consists_of_exercise WHERE workout_id = %s', (workout_id,))
    exercises = cursor.fetchall()

    exercise_list = list()
    for exercise in exercises:
        exercise_id = exercise['exercise_id']
        set_count = exercise['set_count']
        repetition = exercise['repetition']
        cursor.execute('SELECT * FROM Exercise WHERE exercise_id = %s', (exercise_id,))
        exercise = cursor.fetchone()
        if exercise is None:
            return jsonify({'message': 'Exercise not found!'}), 403
        
        exercise['set_count'] = set_count
        exercise['repetition'] = repetition
        exercise_list.append(exercise)

    workout['exercises'] = exercise_list

    cursor.close()

    return jsonify({'message': 'Trainer Workout Session created successfully!', 'workout': workout})

@workout.route('/create/fe', methods=['POST'])
def create_workout_fe():
    workout_id = str(uuid.uuid4())
    fe_id = request.json['fe_id']
    name = request.json['name']
    audience = request.json['audience']
    description = request.json['description']
    duration = request.json['duration']
    intensity = request.json['intensity']
    exercises = request.json['exercises']
    start_date = datetime.now() + timedelta(hours=3)

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403
    
    cursor.execute('INSERT INTO WorkoutSession (workout_id, name, audience, description, duration, intensity) VALUES (%s, %s, %s, %s, %s, %s)', (workout_id, name, audience, description, duration, intensity))
    cursor.execute('INSERT INTO has_workout (fe_id, workout_id, start_date) VALUES (%s, %s, %s)', (fe_id, workout_id, start_date))
    
    for exercise in exercises:
        exercise_id = exercise['exercise_id']
        sets = exercise['sets']
        reps = exercise['reps']
        cursor.execute('INSERT INTO consists_of_exercise (workout_id, exercise_id, set_count, repetition) VALUES (%s, %s, %s, %s)', (workout_id, exercise_id, sets, reps))
    
    connection.commit()
    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()

    workout_id = workout['workout_id']
    cursor.execute('SELECT * FROM consists_of_exercise WHERE workout_id = %s', (workout_id,))
    exercises = cursor.fetchall()

    exercise_list = list()
    for exercise in exercises:
        exercise_id = exercise['exercise_id']
        set_count = exercise['set_count']
        repetition = exercise['repetition']
        cursor.execute('SELECT * FROM Exercise WHERE exercise_id = %s', (exercise_id,))
        exercise = cursor.fetchone()
        if exercise is None:
            return jsonify({'message': 'Exercise not found!'}), 403
        
        exercise['set_count'] = set_count
        exercise['repetition'] = repetition
        exercise_list.append(exercise)

    workout['exercises'] = exercise_list

    cursor.close()

    return jsonify({'message': 'Fitness Enthusiast Workout Session created successfully!', 'workout': workout})

@workout.route('/list', methods=['GET'])
def list_workout():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM WorkoutSession WHERE trainer_id IS NOT NULL')
    workouts = cursor.fetchall()
    if len(workouts) == 0:
        return jsonify({'message': 'No Workout Sessions exists!'}), 403

    for workout in workouts:
        workout_id = workout['workout_id']
        cursor.execute('SELECT * FROM consists_of_exercise WHERE workout_id = %s', (workout_id,))
        exercises = cursor.fetchall()
        
        exercise_list = list()
        for exercise in exercises:
            exercise_id = exercise['exercise_id']
            set_count = exercise['set_count']
            repetition = exercise['repetition']
            cursor.execute('SELECT * FROM Exercise WHERE exercise_id = %s', (exercise_id,))
            exercise = cursor.fetchone()
            if exercise is None:
                return jsonify({'message': 'Exercise not found!'}), 403
            
            exercise['set_count'] = set_count
            exercise['repetition'] = repetition
            exercise_list.append(exercise)

        workout['exercises'] = exercise_list

    cursor.close()

    return jsonify(workouts)

@workout.route('/list/fe', methods=['GET'])
def list_workout_fe():
    fe_id = request.args.get('fe_id')

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403

    cursor.execute('SELECT * FROM has_workout WHERE fe_id = %s', (fe_id,))
    workouts = cursor.fetchall()
    if len(workouts) == 0:
        return jsonify({'message': 'No Workout Sessions exists!'}), 403

    workout_list = list()
    for workout in workouts:
        workout_id = workout['workout_id']
        cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
        workout = cursor.fetchone()
        if workout is None:
            return jsonify({'message': 'Workout Session not found!'}), 403
        
        workout_list.append(workout)
    
    for workout in workout_list:
        workout_id = workout['workout_id']
        cursor.execute('SELECT * FROM consists_of_exercise WHERE workout_id = %s', (workout_id,))
        exercises = cursor.fetchall()
        
        exercise_list = list()
        for exercise in exercises:
            exercise_id = exercise['exercise_id']
            set_count = exercise['set_count']
            repetition = exercise['repetition']
            cursor.execute('SELECT * FROM Exercise WHERE exercise_id = %s', (exercise_id,))
            exercise = cursor.fetchone()
            if exercise is None:
                return jsonify({'message': 'Exercise not found!'}), 403
            
            exercise['set_count'] = set_count
            exercise['repetition'] = repetition
            exercise_list.append(exercise)

        workout['exercises'] = exercise_list

    cursor.close()

    return jsonify(workout_list)

@workout.route('/pick', methods=['POST'])
def pick_workout():
    workout_id = request.json['workout_id']
    fe_id = request.json['fe_id']
    start_date = datetime.now() + timedelta(hours=3)

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403

    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()
    if workout is None:
        return jsonify({'message': 'Workout Session not found!'}), 403
    
    cursor.execute('SELECT * FROM has_workout WHERE fe_id = %s AND workout_id = %s', (fe_id, workout_id))
    has_workout = cursor.fetchone()
    if has_workout is not None:
        return jsonify({'message': 'Workout Session already picked!'}), 403
    
    cursor.execute('INSERT INTO has_workout (fe_id, workout_id, start_date) VALUES (%s, %s, %s)', (fe_id, workout_id, start_date))

    connection.commit()
    cursor.close()

    return jsonify({'message': 'Workout Session picked successfully!'})

@workout.route('/finish', methods=['POST'])
def finish_workout():
    workoutlog_id = str(uuid.uuid4())
    fe_id = request.json['fe_id']
    workout_id = request.json['workout_id']
    end_date = datetime.now() + timedelta(hours=3)

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()
    if workout is None:
        return jsonify({'message': 'Workout Session not found!'}), 403,

    cursor.execute('SELECT * FROM has_workout WHERE fe_id = %s AND workout_id = %s', (fe_id, workout_id))
    has_workout = cursor.fetchone()
    if has_workout is None:
        return jsonify({'message': 'Workout Session not picked!'}), 403
    
    start_date = has_workout['start_date']

    cursor.execute('INSERT INTO WorkoutLog (workoutlog_id, fe_id, workout_id, start_date, end_date) VALUES (%s, %s, %s, %s, %s)', (workoutlog_id, fe_id, workout_id, start_date, end_date))
    cursor.execute('DELETE FROM has_workout WHERE fe_id = %s AND workout_id = %s', (fe_id, workout_id,))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Workout Session finished successfully!'})

@workout.route('/log', methods=['GET'])
def log_workout():
    fe_id = request.args.get('fe_id')

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM WorkoutLog WHERE fe_id = %s', (fe_id,))
    workout_logs = cursor.fetchall()
    if len(workout_logs) == 0:
        return jsonify({'message': 'No Workout Logs exists!'}), 403
    
    workout_list = list()
    for workout_log in workout_logs:
        workout_id = workout_log['workout_id']
        start_date = workout_log['start_date']
        end_date = workout_log['end_date']
        cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
        workout = cursor.fetchone()
        if workout is None:
            return jsonify({'message': 'Workout Session not found!'}), 403
        
        workout['start_date'] = start_date
        workout['end_date'] = end_date
        cursor.execute('SELECT * FROM consists_of_exercise WHERE workout_id = %s', (workout_id,))
        exercises = cursor.fetchall()

        exercise_list = list()
        for exercise in exercises:
            exercise_id = exercise['exercise_id']
            set_count = exercise['set_count']
            repetition = exercise['repetition']
            cursor.execute('SELECT * FROM Exercise WHERE exercise_id = %s', (exercise_id,))
            exercise = cursor.fetchone()
            if exercise is None:
                return jsonify({'message': 'Exercise not found!'}), 403
            
            exercise['set_count'] = set_count
            exercise['repetition'] = repetition
            exercise_list.append(exercise)
        
        workout['exercises'] = exercise_list
        workout_list.append(workout)

    cursor.close()

    return jsonify(workout_list)

@workout.route('/detail', methods=['GET'])
def detail_workout():
    workout_id = request.args.get('workout_id')

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()
    if workout is None:
        return jsonify({'message': 'Workout Session not found!'}), 403

    cursor.execute('SELECT * FROM consists_of_exercise WHERE workout_id = %s', (workout_id,))
    exercises = cursor.fetchall()

    exercise_list = list()
    for exercise in exercises:
        exercise_id = exercise['exercise_id']
        set_count = exercise['set_count']
        repetition = exercise['repetition']
        cursor.execute('SELECT * FROM Exercise WHERE exercise_id = %s', (exercise_id,))
        exercise = cursor.fetchone()
        if exercise is None:
            return jsonify({'message': 'Exercise not found!'}), 403
        
        exercise['set_count'] = set_count
        exercise['repetition'] = repetition
        exercise_list.append(exercise)

    workout['exercises'] = exercise_list

    cursor.close()

    return jsonify(workout)