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
        return jsonify({'message': 'Trainer not found!'})
    
    cursor.execute('INSERT INTO Workout (workout_id, trainer_id, name, audience, description) VALUES (%s, %s, %s, %s, %s)', (workout_id, trainer_id, name, audience, description))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'FE Workout Session created successfully!'})