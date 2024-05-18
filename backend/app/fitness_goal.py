from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
from datetime import datetime
import uuid

fitness_goal = Blueprint('fitness_goal', __name__, url_prefix='/fitness_goal')

@fitness_goal.route('/create', methods=['POST'])
def create():
    goal_id = uuid.uuid4().int
    fe_id = request.json['fe_id']
    name = request.json['name']
    target_region = request.json['target_region']
    calorie = request.json['calorie']
    start_time = datetime.now()
    duration = request.json['duration']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'})
    
    cursor.execute('INSERT INTO FitnessGoal(goal_id, fe_id, name, target_region, calorie, start_time, duration) VALUES (%s, %s, %s, %s, %s, %s, %s)', (goal_id, fe_id, name, target_region, calorie, start_time, duration))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Fitness Goal set successfully!'})

@fitness_goal.route('/list', methods=['GET'])
def list():
    fe_id = request.json['fe_id']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'})

    cursor.execute('SELECT * FROM FitnessGoal WHERE fe_id = %s', (fe_id,))
    goals = cursor.fetchall()
    if goals is None:
        return jsonify({'message': 'No Fitness Goals were set!'})
    
    cursor.close()  
    return jsonify({'FitnessGoal': goals,})