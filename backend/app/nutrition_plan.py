from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from datetime import datetime, timedelta
from database import connect
import uuid

nutrition_plan = Blueprint('nutrition_plan', __name__, url_prefix='/nutrition_plan')

@nutrition_plan.route('/create', methods=['POST'])
def create_nutrition_plan():
    plan_id = str(uuid.uuid4())
    fe_id = request.json['fe_id'] 
    name = request.json['name']
    description = request.json['description']
    nutritions = request.json['nutritions']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403

    cursor.execute('INSERT INTO NutritionPlan (plan_id, fe_id, name, description) VALUES (%s, %s, %s, %s)', (plan_id, fe_id, name, description))
    for nutrition in nutritions:
        nut_id = nutrition['nut_id']
        portion = nutrition['portion']
        cursor.execute('INSERT INTO consists_of_nut (plan_id, nut_id, fe_id, portion) VALUES (%s, %s, %s, %s)', (plan_id, nut_id, fe_id, portion))
    
    connection.commit()
    
    cursor.execute('SELECT * FROM NutritionPlan WHERE plan_id = %s', (plan_id,))
    nut_plan = cursor.fetchone()
    cursor.execute('SELECT * FROM consists_of_nut WHERE plan_id = %s', (plan_id,))
    nutritions = cursor.fetchall()
    nut_plan['nutritions'] = nutritions

    cursor.close()

    return jsonify({'message': 'Nutrition Plan created successfully!', 'nutrition_plan': nut_plan})

@nutrition_plan.route('/delete', methods=['POST'])
def delete_nutrition_plan():
    plan_id = request.json['plan_id']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute ('SELECT * FROM NutritionPlan WHERE plan_id = %s', (plan_id,))
    plan = cursor.fetchone()
    if plan is None:
        return jsonify({'message': 'Nutrition Plan not found!'}), 403
    
    cursor.execute('DELETE FROM consists_of_nut WHERE plan_id = %s', (plan_id,))
    cursor.execute('DELETE FROM NutritionPlan WHERE plan_id = %s', (plan_id,))
    connection.commit()

    cursor.close()

    return jsonify({'message': 'Nutrition Plan deleted successfully!'})

@nutrition_plan.route('/list', methods=['GET'])
def list_plan():
    fe_id = request.args.get('fe_id')

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness Enthusiast not found!'}), 403
    
    cursor.execute('SELECT * FROM NutritionPlan WHERE fe_id = %s', (fe_id,))
    nutrition_plans = cursor.fetchall()
    if len(nutrition_plans) == 0:
        return jsonify({'message': 'Nutrition Plans not found!'}), 403

    nutrition_plan_list = list()
    for plan in nutrition_plans:
        plan_id = plan['plan_id']
        print(plan_id, flush=True)
        cursor.execute('SELECT * FROM NutritionLog WHERE plan_id = %s', (plan_id,))
        logs = cursor.fetchone()
        if logs is not None:
            continue
        
        cursor.execute('SELECT * FROM consists_of_nut WHERE plan_id = %s', (plan_id,))
        nutritions = cursor.fetchall()
        plan['nutritions'] = nutritions
        nutrition_plan_list.append(plan)
    
    cursor.close()

    if len(nutrition_plan_list) == 0:
        return jsonify({'message': 'Nutrition Plans not found!'}), 403

    return jsonify({'nutrition_plans': nutrition_plan_list})

@nutrition_plan.route('/finish', methods=['POST'])
def finish():
    nutlog_id = str(uuid.uuid4())
    plan_id = request.json['plan_id']
    fe_id = request.json['fe_id']
    date_time = datetime.now() + timedelta(hours=3)

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM NutritionPlan WHERE plan_id = %s', (plan_id,))
    plan = cursor.fetchone()
    if plan is None:
        return jsonify({'message': 'Nutrition Plan not found!'}), 403

    cursor.execute('INSERT INTO NutritionLog (nutlog_id, plan_id, fe_id, date_time) VALUES (%s, %s, %s, %s)', (nutlog_id, plan_id, fe_id, date_time))
    connection.commit()

    cursor.close()

    return jsonify({'message': 'Nutrition Plan finished successfully!'})