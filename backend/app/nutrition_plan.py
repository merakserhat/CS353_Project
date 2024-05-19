from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect  # Assuming you have a database.py file with a connect function
import uuid

nutrition_plan = Blueprint('nutrition_plan', __name__, url_prefix='/nutrition_plan')

@nutrition_plan.route('/create', methods=['POST'])
def create_nutrition_plan():
    plan_id = str(uuid.uuid4())
    fe_id = request.json['fe_id'] 
    name = request.json['name']
    content = request.json['content']
    foods = request.json['foods']  

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 404

    cursor.execute('INSERT INTO NutritionPlan (plan_id, fe_id, name, content) VALUES (%s, %s, %s, %s)', (plan_id, fe_id, name, content))
    for food_id in foods:
        cursor.execute('INSERT INTO consists_of_nut (nut_id, plan_id, fe_id) VALUES (%s, %s, %s)', (food_id, plan_id, fe_id))
    
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Nutrition Plan created successfully!'})

@nutrition_plan.route('/delete', methods=['DELETE'])
def delete_nutrition_plan():
    plan_id = request.json['plan_id'] 
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('DELETE FROM NutritionPlan WHERE plan_id = %s', (plan_id,))
    cursor.execute('DELETE FROM consists_of_nut WHERE plan_id = %s', (plan_id,))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Nutrition Plan deleted successfully!'})

@nutrition_plan.route('/add_food', methods=['POST'])
def add_food_to_nutrition_plan():
    plan_id = request.json['plan_id'] 
    nut_id = request.json['nut_id']
    fe_id = request.json['fe_id']
    
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM NutritionPlan WHERE plan_id = %s', (plan_id,))
    plan = cursor.fetchone()
    if plan is None:
        return jsonify({'message': 'Nutrition Plan not found!'}), 404

    cursor.execute('INSERT INTO consists_of_nut (nut_id, plan_id, fe_id) VALUES (%s, %s, %s)', (nut_id, plan_id, fe_id))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Food added to Nutrition Plan successfully!'})

@nutrition_plan.route('/delete_food', methods=['DELETE'])
def delete_food_from_nutrition_plan():
    plan_id = request.json['plan_id'] 
    nut_id = request.json['nut_id']
    fe_id = request.json['fe_id']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('DELETE FROM consists_of_nut WHERE plan_id = %s AND nut_id = %s AND fe_id = %s', (plan_id, nut_id, fe_id))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Food deleted from Nutrition Plan successfully!'})