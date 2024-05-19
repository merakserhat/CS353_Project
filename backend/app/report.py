from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
import uuid
from datetime import datetime, timedelta

report = Blueprint('report', __name__, url_prefix='/report')

@report.route('/get', methods=['GET'])
def get():
    fe_id = request.args.get('fe_id')

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'}), 403

    cursor.execute('SELECT * FROM WorkoutLog WHERE fe_id = %s', (fe_id,))
    workout_logs = cursor.fetchall()

    cursor.execute('SELECT * FROM NutritionLog WHERE fe_id = %s', (fe_id,))
    nutrition_logs = cursor.fetchall()

    workouts = list()
    for workout_log in workout_logs:
        workout_id = workout_log['workout_id']
        cursor.execute('SELECT * FROM WorkoutSession WHERE workout_id = %s', (workout_id,))
        workout = cursor.fetchone()
        workout['start_date'] = workout_log['start_date']
        workout['end_date'] = workout_log['end_date']
        workouts.append(workout)

    nutrition_plans = list()
    for nutrition_log in nutrition_logs:
        plan_id = nutrition_log['plan_id']
        cursor.execute('SELECT * FROM NutritionPlan WHERE plan_id = %s', (plan_id,))
        nutrition_plan = cursor.fetchone()
        nutrition_plan['start_date'] = nutrition_log['start_date']
        nutrition_plan['end_date'] = nutrition_log['end_date']
        nutrition_plans.append(nutrition_plan)

    for workout in workouts:
        workout_id = workout['workout_id']
        cursor.execute('SELECT * FROM consists_of_exercise WHERE workout_id = %s', (workout_id,))
        exercises = cursor.fetchall()

        exercise_list = list()
        for exercise in exercises:
            exercise_id = exercise['exercise_id']
            cursor.execute('SELECT * FROM Exercise WHERE exercise_id = %s', (exercise_id,))
            exercise = cursor.fetchone()
            exercise_list.append(exercise)
        
        workout['exercises'] = exercise_list

    for nutrition_plan in nutrition_plans:
        plan_id = nutrition_plan['plan_id']
        cursor.execute('SELECT * FROM consists_of_nut WHERE plan_id = %s', (plan_id,))
        nutritions = cursor.fetchall()

        nutrition_list = list()
        for nutrition in nutritions:
            nut_id = nutrition['nut_id']
            portion = nutrition['portion']
            cursor.execute('SELECT * FROM Nutrition WHERE nut_id = %s', (nut_id,))
            nutrition = cursor.fetchone()
            nutrition['portion'] = portion
            nutrition_list.append(nutrition)
        
        nutrition_plan['nutritions'] = nutrition_list

    calorie_list = list()
    for nutrition_plan in nutrition_plans:
        calorie_count = 0
        for nutrition in nutrition_plan['nutritions']:
            calorie_count += nutrition['calorie'] * nutrition['portion']
        calorie_list.append(calorie_count)

    workout_region_list = list()
    for workout in workouts:
        target_regions = list()
        for exercise in workout['exercises']:
            target_regions.append(exercise['target_region'])
        workout_region_list.append(target_regions)
    
    cursor.execute('SELECT * FROM FitnessGoal WHERE fe_id = %s', (fe_id,))
    fitness_goals = cursor.fetchall()
    if len(fitness_goals) == 0:
        return jsonify({'message': 'Fitness goals not found!'}), 403
    
    goals = list()
    for fitness_goal in fitness_goals:
        calorie = fitness_goal['calorie']
        target_region = fitness_goal['target_region']
    
        if calorie is not None:
            if calorie < calorie_list[-1] - 100:
                goals.append('Calorie intake is too low!')
            elif calorie > calorie_list[-1] + 100:
                goals.append('Calorie intake is too high!')
            else:
                goals.append('Calorie intake is perfect!')
        
        if target_region is not None:
            if target_region not in workout_region_list[0]:
                goals.append('Target region is not being exercised!')
            else:
                goals.append('Target region is being exercised!')

    description = ''
    for goal in goals:
        description += goal + ' '

    report_id = str(uuid.uuid4())
    cursor.execute('INSERT INTO Report (report_id, fe_id, description) VALUES (%s, %s, %s)', (report_id, fe_id, description))
    connection.commit()

    cursor.execute('SELECT * FROM Report WHERE report_id = %s', (report_id,))
    report = cursor.fetchone()

    cursor.close()

    return jsonify({'message': 'Report generated!', 'report': report,})

@report.route('/system', methods=['GET'])
def system():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    # Query to get the maximum and minimum calorie intake for each fitness enthusiast
    cursor.execute('''
        SELECT fe_id, MAX(calorie) AS max_calorie, MIN(calorie) AS min_calorie
        FROM FitnessGoal
        GROUP BY fe_id
    ''')
    calorie_intake = cursor.fetchall()

    # Query to get the average number of exercises per workout session
    cursor.execute('''
        SELECT AVG(exercise_count) AS avg_exercises
        FROM (
            SELECT workout_id, COUNT(*) AS exercise_count
            FROM consists_of_exercise
            GROUP BY workout_id
        ) AS subquery
    ''')
    avg_exercises = cursor.fetchone()



    cursor.execute('SELECT * FROM MostPopularExercise')
    most_popular_exercise = cursor.fetchall()

    cursor.close()


    return jsonify({
        'message': 'System report generated!',
        'calorie_intake': calorie_intake,
        'avg_exercises': avg_exercises['avg_exercises'],
        'most_popular_exercise': most_popular_exercise,
    })