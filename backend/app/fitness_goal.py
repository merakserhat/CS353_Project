from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
from datetime import datetime, timedelta
import uuid

fitness_goal = Blueprint('fitness_goal', __name__, url_prefix='/fitness_goal')

@fitness_goal.route('/create', methods=['POST'])
def create():
    fe_id = request.json['fe_id']
    goal_id = str(uuid.uuid4())
    name = request.json['name']
    target_region = request.json['target_region']
    calorie = request.json['calorie']
    start_time = datetime.now() + timedelta(hours=3)
    duration = request.json['duration']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'}), 403
    
    if target_region != '':
        cursor.execute('INSERT INTO FitnessGoal(goal_id, fe_id, name, target_region, start_time, duration) VALUES (%s, %s, %s, %s, %s, %s)', (goal_id, fe_id, name, target_region, start_time, duration))

    if calorie != 0:
        cursor.execute('INSERT INTO FitnessGoal(goal_id, fe_id, name, calorie, start_time, duration) VALUES (%s, %s, %s, %s, %s, %s)', (goal_id, fe_id, name, calorie, start_time, duration))
    
    connection.commit()

    cursor.execute('SELECT * FROM FitnessGoal WHERE goal_id = %s', (goal_id,))
    goal = cursor.fetchone()

    cursor.close()

    return jsonify({'message': 'Fitness Goal set successfully!', 'goal': goal})

@fitness_goal.route('/list', methods=['GET'])
def list():
    fe_id = request.args.get('fe_id')
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'}), 403

    cursor.execute('SELECT * FROM FitnessGoal WHERE fe_id = %s', (fe_id,))
    goals = cursor.fetchall()
    if len(goals) == 0:
        return jsonify({'message': 'No Fitness Goals were set!'}), 403
    
    cursor.close()  
    return jsonify({'FitnessGoals': goals,})