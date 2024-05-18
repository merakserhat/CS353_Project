import uuid
from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect

exercise = Blueprint('exercise', __name__, url_prefix='/exercise')

@exercise.route('/list', methods=['GET'])
def exercise_list():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM Exercise")
    exercises = cursor.fetchall()
    if not exercises:
        return 'slm'
    for exercise in exercises:
            exercise['exercise_id'] = exercise['exercise_id'].hex()

    connection.commit()
    cursor.close()

    return jsonify(exercises)

# @exercise.route('/create', methods=['POST'])
# def create_exercise():
#     data = request.get_json()

#     if not data or not all(k in data for k in ("exercise_name", "target_region", "description")):
#         return jsonify({"message": "Invalid input"}), 400

#     exercise_id = 1
#     exercise_name = data['exercise_name']
#     target_region = data['target_region']
#     description = data['description']

#     connection = connect()
#     cursor = connection.cursor()

#     query = """
#     INSERT INTO Exercise (exercise_id, exercise_name, target_region, description)
#     VALUES (%s, %s, %s, %s)
#     """
#     cursor.execute(query, (exercise_id, exercise_name, target_region, description))
#     connection.commit()

#     cursor.close()
#     connection.close()

#     return jsonify({"message": "Exercise created successfully", "exercise_id": exercise_id.hex()}), 201
