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
        return jsonify({'message': 'No exercises in the system'}), 403
    
    cursor.close()
    return jsonify(exercises)