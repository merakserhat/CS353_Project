from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
import uuid

achievement = Blueprint('achievement', __name__, url_prefix='/achievement')

@achievement.route('/create', methods=['POST'])
def create():
    achievement_id = str(uuid.uuid4())
    fe_id = request.json['fe_id']
    goal_id = request.json['goal_id']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'}), 403
    
    cursor.execute('SELECT * FROM FitnessGoal WHERE goal_id = %s', (goal_id,))
    goal = cursor.fetchone()
    if goal is None:
        return jsonify({'message': 'Fitness Goal not found!'}), 403
    
    name = goal['name']
    target_region = goal['target_region']
    calorie = goal['calorie']
    start_time = goal['start_time']
    duration = goal['duration']
    cursor.execute('INSERT INTO PastAchievement (achievement_id, fe_id, goal_id, name, target_region, calorie, start_time, duration) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (achievement_id, fe_id, goal_id, name, target_region, calorie, start_time, duration))
    cursor.execute('DELETE FROM FitnessGoal WHERE goal_id = %s', (goal_id,))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Achievement set successfully!'})

@achievement.route('/list', methods=['GET'])
def list():
    fe_id = request.json['fe_id']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'}), 403

    cursor.execute('SELECT * FROM PastAchievement WHERE fe_id = %s', (fe_id,))
    achievements = cursor.fetchall()
    if achievements is None:
        return jsonify({'message': 'No Achievements were set!'}), 403
    
    cursor.close()  
    return jsonify({'Achievement': achievements,})