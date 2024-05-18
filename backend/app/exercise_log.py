from aifc import Error
import uuid
from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect

exercise_log = Blueprint('exercise_log', __name__, url_prefix='/exercise_log')

@exercise_log.route('/list/<fe_id>', methods=['GET'])
def get_exercise_logs(fe_id):
    try:
        connection = connect()
        cursor = connection.cursor(MySQLdb.cursors.DictCursor)
        print(fe_id, flush= True)
        
        # SQL query to retrieve exercise logs for the specified user
        query = '''
            SELECT el.exlog_id, el.fe_id, el.date_time, ke.exercise_id, ke.set_count, ke.repetition
            FROM ExerciseLog el
            JOIN keeps_exercise ke ON el.exlog_id = ke.exlog_id AND el.fe_id = ke.fe_id
            WHERE el.fe_id = %s
            ORDER BY el.date_time DESC
        '''
        
        cursor.execute(query, (fe_id,))
        results = cursor.fetchall()

        if not results:
            return 'No exercises in the system'
        for result in results:
            result['exercise_id'] = results['exercise_id'].hex()
            result['exlog_id'] = results['exlog_id'].hex()
            result['fe_id'] = results['fe_id'].hex()


        # Close database connection
        cursor.close()
        connection.close()

        # Return results as JSON
        return jsonify(results), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500



@exercise_log.route('/create', methods=['POST'])
def create_exercise_log():
    data = request.get_json()

    if not data or not all(k in data for k in ("fe_id", "date_time")):
        return jsonify({"message": "Invalid input"}), 400

    exlog_id = uuid.uuid4().int
    fe_id = int(data['fe_id'])  # Assuming fe_id is provided as a hex string
    date_time = int(data['date_time'])  # Assuming date_time is provided as an integer timestamp
    exercises = data.get('exercises', [])

    connection = connect()
    if connection is None:
        return jsonify({"message": "Database connection failed"}), 500

    cursor = connection.cursor()

    try:
        query = """
        INSERT INTO ExerciseLog (exlog_id, fe_id, date_time)
        VALUES (%s, %s, %s)
        """
        cursor.execute(query, (exlog_id, fe_id, date_time))

        keeps_exercise_query = '''
            INSERT INTO keeps_exercise (exlog_id, fe_id, exercise_id, set_count, repetition)
            VALUES (%s, %s, %s, %s, %s)
        '''
        for exercise in exercises:
            cursor.execute(keeps_exercise_query, (exlog_id, fe_id, exercise['exercise_id'], exercise['set_count'], exercise['repetition']))

        connection.commit()

    # except mysql.connector.Error as err:
    #     print(f"Error: {err}")
    #     return jsonify({"message": "Error creating exercise log"}), 500
    finally:
        cursor.close()
        connection.close()

    return jsonify({"message": "Exercise log created successfully", "exlog_id": exlog_id.hex()}), 201
