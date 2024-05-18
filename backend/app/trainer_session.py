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

    today = datetime.now() + timedelta(hours=3)

    today = today.replace(hour=0, minute=0, second=0, microsecond=0)
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
            'INSERT INTO TrainerSession (session_id, trainer_id, start_time, end_time, availability) VALUES (%s, %s, %s, %s, %s)',
            (session_id, trainer_id, current_start_time, current_end_time, 0)
        )

        current_start_time = current_end_time

    connection.commit()
    cursor.close()
    
    return jsonify({'message': 'Sessions created successfully!'})



@trainer_session.route('/reserve', methods=['POST'])
def reserve():
    session_id = request.json.get('session_id')
    fe_id = request.json['fe_id']
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    #Check if session exists
    cursor.execute('SELECT * FROM TrainerSession WHERE session_id = %s', (session_id,))
    if cursor.fetchone() is None:
        return jsonify({'message': 'Session does not exist!'})

    # Update availability and fe_id
    cursor.execute('UPDATE TrainerSession SET availability = 1, fe_id = %s WHERE session_id = %s',(fe_id, session_id))

    connection.commit()
    cursor.close()

    return jsonify({'message': 'Availability updated successfully!'})


@trainer_session.route('/unreserve', methods=['POST'])
def unreserve():
    session_id = request.json.get('session_id')
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    #Check if session exists
    cursor.execute('SELECT * FROM TrainerSession WHERE session_id = %s', (session_id,))
    if cursor.fetchone() is None:
        return jsonify({'message': 'Session does not exist!'})

    # Update availability and fe_id TO NULL
    cursor.execute('UPDATE TrainerSession SET availability = 0, fe_id = NULL WHERE session_id = %s',(session_id,))
    
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Availability updated successfully!'})


@trainer_session.route('/fe/available_sessions', methods=['GET'])
def list_available_sessions():
    now = datetime.now() + timedelta(hours=3)
    trainer_id = request.json['trainer_id']
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)


    cursor.execute('SELECT * FROM TrainerSession WHERE trainer_id = %s AND availability = 0 AND start_time > %s', (trainer_id, now,))
    sessions = cursor.fetchall()

    cursor.close()
    return jsonify(sessions)

@trainer_session.route('/fe/sessions', methods=['GET'])
def list_sessions():
    now = datetime.now() + timedelta(hours=3)
    fe_id = request.json['fe_id']
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)


    cursor.execute('SELECT * FROM TrainerSession WHERE fe_id = %s AND availability = 1 ', (fe_id,))
    sessions = cursor.fetchall()

    cursor.close()
    return jsonify(sessions)


@trainer_session.route('/trainer/sessions', methods=['GET'])
def list_trainer_sessions():
    trainer_id = request.json['trainer_id']
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute('SELECT * FROM TrainerSession WHERE trainer_id = %s AND availability = 1', (trainer_id,))
    sessions = cursor.fetchall()

    cursor.close()
    return jsonify(sessions)

