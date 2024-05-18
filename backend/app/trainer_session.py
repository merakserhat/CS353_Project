from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
import uuid
from datetime import datetime, timedelta

trainer_session = Blueprint('trainer_session', __name__, url_prefix='/trainer_session')

@trainer_session.route('/create', methods=['POST'])
def create_session():
    trainer_id = request.json['trainer_id']
    start_hour = int(request.json['start_time'])  
    end_hour = int(request.json['end_time'])  


    availability = 0
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    start_time = today + timedelta(hours=start_hour)
    end_time = today + timedelta(hours=end_hour)

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    current_start_time = start_time
    while current_start_time < end_time:
        session_id = str(uuid.uuid4())
        current_end_time = current_start_time + timedelta(hours=1)
        if current_end_time > end_time:
            current_end_time = end_time

        cursor.execute(
            'INSERT INTO TrainerSession (session_id, trainer_id, start_time, end_time) VALUES (%s, %s, %s, %s)',
            (session_id, trainer_id, current_start_time, current_end_time)
        )

        current_start_time = current_end_time

    connection.commit()
    cursor.close()
    
    return jsonify({'message': 'Sessions created successfully!'})

@trainer_session.route('/list', methods=['GET'])
def list_sessions():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    
    cursor.execute('SELECT * FROM TrainerSession')
    sessions = cursor.fetchall()
    cursor.close()
    
    return jsonify(sessions)

