from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
from datetime import datetime
import uuid

fitness_goal = Blueprint('fitness_goal', __name__, url_prefix='/fitness_goal')

@fitness_goal.route('/set/goal', methods=['POST'])
def set_goal():
    goal_id = uuid.uuid4().int
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (request.json['fe_id'],))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'})
    
    fe_id = request.json['fe_id']
    name = request.json['name']
    target_region = request.json['target_region']
    calorie = request.json['calorie']
    description = request.json['description']
    start_time = datetime.now()
    duration = request.json['duration']
    cursor.execute('INSERT INTO FitnessGoal(goal_id, fe_id, name, target_region, calorie, description, start_time, duration) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (goal_id, fe_id, name, target_region, calorie, description, start_time, duration))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Fitness Goal set successfully!'})

@fitness_goal.route('/list/goal', methods=['GET'])
# lists both goals and achievements
def list_goals():
    fe_id = request.json['fe_id']
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessGoal WHERE fe_id = %s', (fe_id,))
    goals = cursor.fetchall()
    
    cursor.execute('SELECT * FROM PastAchievement WHERE fe_id = %s', (fe_id,))
    PastAchievements = cursor.fetchall()
    cursor.close()  
    return jsonify({
        'FitnessGoal': goals,
        'PastAchievement': PastAchievements
    })

@fitness_goal.route('/update/achievements', methods=['POST'])
def update_achievements():
    fe_id = request.json['fe_id']
    goal_id = request.json['goal_id']
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessGoal WHERE goal_id = %s AND fe_id = %s', (goal_id, fe_id))
    ach = cursor.fetchall()
    if ach is None:
        return jsonify({'message': 'No Fitness Goals were achieved!'}) # error messagelara detaylı bakıcam
    
    ach_id = uuid.uuid4().int
    cursor.execute('INSERT INTO PastAchievement (ach_id, fe_id, goal_id) VALUES (%s, %s, %s)', (ach_id, fe_id, goal_id))
    cursor.execute('DELETE FROM FitnessGoal WHERE goal_id = %s', (goal_id,))
    connection.commit()
    
    cursor.close()
    
    return jsonify({'message': 'Fitness Goal updated successfully!'})
    
