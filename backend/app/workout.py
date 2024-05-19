from flask import Blueprint, request, jsonify
import MySQLdb.cursors
import uuid
from database import connect

workout = Blueprint('workout', __name__, url_prefix='/workout')

@workout.route('/create/trainer', methods=['POST'])
def create_workout_trainer():
    workout_id = str(uuid.uuid4())
    trainer_id = request.json['trainer_id']
    name = request.json['name']
    audience = request.json['audience']
    description = request.json['description']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM Trainer WHERE trainer_id = %s', (trainer_id,))
    trainer = cursor.fetchone()
    if trainer is None:
        return jsonify({'message': 'Trainer not found!'}), 403
    
    cursor.execute('INSERT INTO WorkoutSession (workout_id, trainer_id, name, audience, description) VALUES (%s, %s, %s, %s, %s)', (workout_id, trainer_id, name, audience, description))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Trainer Workout Session created successfully!'})

@workout.route('/create/fe', methods=['POST'])
def create_workout_fe():
    workout_id = str(uuid.uuid4())
    fe_id = request.json['fe_id']
    name = request.json['name']
    audience = request.json['audience']
    description = request.json['description']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403
    
    cursor.execute('INSERT INTO WorkoutSession (workout_id, name, audience, description) VALUES (%s, %s, %s, %s)', (workout_id, name, audience, description))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Fitness Enthusiast Workout Session created successfully!'})

@workout.route('/list', methods=['GET'])
def list_workout():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM WorkoutSession WHERE trainer_id IS NOT NULL')
    workouts = cursor.fetchall()
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

    cursor.execute('UPDATE WorkoutSession SET name = %s, audience = %s, description = %s WHERE workout_id = %s', (name, audience, description, workout_id))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Workout Session updated successfully!'})