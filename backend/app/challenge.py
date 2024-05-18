from flask import Blueprint, request, jsonify
import MySQLdb.cursors
import uuid
from datetime import datetime
from database import connect

challenge = Blueprint('workout', __name__, url_prefix='/challenge')

@challenge.route('/create', methods=['POST'])
def create_challenge():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    challenge_id = str(uuid.uuid4())
    name = request.json['name']
    prize = request.json['prize']
    start_date = request.json['start_date']
    end_date = request.json['end_date']
    exercise_id = request.json['exercise_id']
    cursor.execute('INSERT INTO Challenge(challenge_id, name, prize, start_date, end_date, exercise_id) VALUES (%s, %s, %s, %s, %s, %s)', (challenge_id, name, prize, start_date, end_date, exercise_id))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Challenge created!'})

@challenge.route('/enter', methods=['POST'])
def enter_challenge():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    
    challenge_id = request.json['challenge_id']
    fe_id = request.json['fe_id']
    cursor.execute('SELECT * FROM Challenge WHERE challenge_id = %s', (challenge_id,))
    challenge = cursor.fetchone()
    if challenge is None:
        return jsonify({'message': 'Challenge not found!'})
    
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'})
    
    cursor.execute('INSERT INTO enters_challenge(fe_id, challenge_id) VALUES (%s, %s)', (fe_id, challenge_id))
    connection.commit()
    cursor.close()
    return jsonify({'message': 'Fitness Enthusiast entered challenge!'})

@challenge.route('/list', methods=['GET'])
def list_challenge():
    connection = connect()
    time = datetime.now()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM Challenge WHERE end_date > %s', (time,))
    challenges = cursor.fetchall()
    if challenges is None:
        return jsonify({'message': 'No challenges found!'})
    cursor.close()
    return jsonify({'Challenges': challenges,})