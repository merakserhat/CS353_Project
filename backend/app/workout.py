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
    exercises = request.json['exercises']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM Trainer WHERE trainer_id = %s', (trainer_id,))
    trainer = cursor.fetchone()
    if trainer is None:
        return jsonify({'message': 'Trainer not found!'}), 403
    
    cursor.execute('INSERT INTO WorkoutSession (workout_id, trainer_id, name, audience, description) VALUES (%s, %s, %s, %s, %s)', (workout_id, trainer_id, name, audience, description))
    for exercise in exercises:
        exercise_name = exercise['exercise_name']
        sets = exercise['sets']
        reps = exercise['reps']
    
        cursor.execute('SELECT * FROM Exercise WHERE name = %s', (exercise_name,))
        exercise = cursor.fetchone()
        if exercise is None:
            return jsonify({'message': 'Exercise not found!'}), 403
        exercise_id = exercise['exercise_id']
        
        cursor.execute('INSERT INTO consists_of_exercise (workout_id, trainer_id, exercise_id, set_count, repetition) VALUES (%s, %s, %s, %s, %s)', (workout_id, trainer_id, exercise_id, sets, reps))

    connection.commit()
    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()
    cursor.close()

    return jsonify({'message': 'Trainer Workout Session created successfully!', 'workout': workout})

@workout.route('/create/fe', methods=['POST'])
def create_workout_fe():
    workout_id = str(uuid.uuid4())
    fe_id = request.json['fe_id']
    name = request.json['name']
    audience = request.json['audience']
    description = request.json['description']
    exercises = request.json['exercises']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403
    
    for exercise in exercises:
        exercise_name = exercise['exercise_name']
        sets = exercise['sets']
        reps = exercise['reps']
    
        cursor.execute('SELECT * FROM Exercise WHERE name = %s', (exercise_name,))
        exercise = cursor.fetchone()
        if exercise is None:
            return jsonify({'message': 'Exercise not found!'}), 403
        exercise_id = exercise['exercise_id']
        
        cursor.execute('INSERT INTO consists_of_exercise (workout_id, exercise_id, set_count, repetition) VALUES (%s, %s, %s, %s)', (workout_id, exercise_id, sets, reps))
    
    cursor.execute('INSERT INTO WorkoutSession (workout_id, name, audience, description) VALUES (%s, %s, %s, %s)', (workout_id, name, audience, description))
    cursor.execute('INSERT INTO has_workout (fe_id, workout_id) VALUES (%s, %s)', (fe_id, workout_id))
    connection.commit()
    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()
    cursor.close()

    return jsonify({'message': 'Fitness Enthusiast Workout Session created successfully!', 'workout': workout})

@workout.route('/list', methods=['GET'])
def list_workout():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM WorkoutSession WHERE trainer_id IS NOT NULL')
    workouts = cursor.fetchall()

    for workout in workouts:
        workout_id = workout['workout_id']
        cursor.execute('SELECT * FROM consists_of_exercise WHERE workout_id = %s', (workout_id,))
        exercises = cursor.fetchall()
        workout['exercises'] = exercises

    cursor.close()

    return jsonify(workouts)

@workout.route('/list/fe', methods=['GET'])
def list_workout_fe():
    fe_id = request.json['fe_id']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403

    cursor.execute('SELECT * FROM has_workout WHERE fe_id = %s', (fe_id,))
    workout_ids = cursor.fetchall()
    if workout_ids is None:
        return jsonify({'message': 'No Workout Sessions found!'}), 403

    workouts = []
    for workout_id in workout_ids:
        cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
        workout = cursor.fetchone()
        workouts.append(workout)
    cursor.close()

    return jsonify(workouts)

@workout.route('/select')
def select_workout():
    workout_id = request.json['workout_id']
    fe_id = request.json['fe_id']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()
    if workout is None:
        return jsonify({'message': 'Workout Session not found!'}), 403
    
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403

    cursor.execute('INSERT INTO has_workout (fe_id, workout_id) VALUES (%s, %s)', (fe_id, workout_id))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Workout Session selected successfully!'})

@workout.route('/update', methods=['POST'])
def update_workout():
    workoutlog_id = str(uuid.uuid4())
    date_time = datetime.now() + timedelta(hours=3)
    fe_id = request.json['fe_id']
    workout_id = request.json['workout_id']
    name = request.json['name']
    audience = request.json['audience']
    description = request.json['description']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
    workout = cursor.fetchone()
    if workout is None:
        return jsonify({'message': 'Workout Session not found!'}), 403

    cursor.execute('SELECT * FROM has_workout WHERE fe_id = %s AND workout_id = %s', (fe_id, workout_id))
    workout = cursor.fetchone()
    if workout is None:
        return jsonify({'message': 'Workout Session not found!'}), 403
    
    cursor.execute('INSERT INTO WorkoutLog (workoutlog_id, fe_id, name, audience, description, date_time) VALUES (%s, %s, %s, %s, %s, %s)', (workoutlog_id, fe_id, name, audience, description, date_time))
    cursor.execute('DELETE FROM has_workout WHERE fe_id = %s AND workout_id = %s', (fe_id, workout_id))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Workout Session updated successfully!'})