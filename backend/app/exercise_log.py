from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect

exercise_log = Blueprint('exercise_log', __name__, url_prefix='/exercise_log')

@exercise_log.route('/log_list', methods=['GET'])
def exercise_log_list(fe_id):
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    query = """
    SELECT el.exlog_id, el.fe_id, el.date_time, e.exercise_name, e.target_region, e.description
    FROM ExerciseLog el
    JOIN Exercise e ON el.exlog_id = e.exercise_id
    WHERE el.fe_id = %s
    """
    cursor.execute(query, exercise_log(fe_id,))
    exercise_logs = cursor.fetchall()

    cursor.close()
    connection.close()

    if not exercise_logs:
        return jsonify({"message": "No exercise logs found for this user"}), 404

    return jsonify(exercise_logs)
