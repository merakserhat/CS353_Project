from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect

workout = Blueprint('workout', __name__, url_prefix='/workout')

@workout.route('/create/session/fe', methods=['POST'])
def create_session_fe():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (request.json['fe_id'],))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'})
    
    fe_id = request.json['fe_id']
    trainer_id = request.json['trainer_id']
    name = request.json['name']
    audience = request.json['audience']
    description = request.json['description']
    duration = request.json['duration']
    availability = request.json['availability']
    cursor.execute('INSERT INTO WorkoutSession(fe_id, trainer_id, name, audience, description, duration, availability) VALUES (%s, %s, %s, %s, %s, %s)', (fe_id, trainer_id, name, audience, description, duration, availability))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'FE Workout Session created successfully!'})