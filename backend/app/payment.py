from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
from datetime import datetime, timedelta
import uuid

payment = Blueprint('fitness_goal', __name__, url_prefix='/payment')

@payment.route('/create', methods=['POST'])
def pay():
    payment_id = str(uuid.uuid4())
    fe_id = request.json['fe_id']
    trainer_id = request.json['trainer_id']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'}), 403
    
    cursor.execute('SELECT * FROM Trainer WHERE trainer_id = %s', (trainer_id,))
    
    trainer = cursor.fetchone()
    if trainer is None:
        return jsonify({'message': 'Trainer not found!'}), 403
    
    amount = request.json['amount']
    payment_time = datetime.now() + timedelta(hours=3)
    
    cursor.execute('INSERT INTO Payment(payment_id, amount, date_time, fe_id, trainer_id) VALUES (%s, %s, %s, %s, %s)', (payment_id, amount, payment_time, fe_id, trainer_id))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Payment created!'})

@payment.route('/list/fe', methods=['GET'])
def list_payment():
    fe_id = request.args.get('fe_id')
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (fe_id,))
    fe = cursor.fetchone()
    if fe is None:
        return jsonify({'message': 'Fitness enthusiast not found!'}), 403
    
    cursor.execute('SELECT * FROM Payment WHERE fe_id = %s', (fe_id,))
    payments = cursor.fetchall()
    if payments is None:
        return jsonify({'message': 'No Payments were made!'}), 403
    
    cursor.close()  
    return jsonify({'Payments': payments,})

@payment.route('/list/trainer', methods=['GET'])
def list_payment_trainer():
    trainer_id = request.args.get('trainer_id')
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM Trainer WHERE trainer_id = %s', (trainer_id,))
    trainer = cursor.fetchone()
    if trainer is None:
        return jsonify({'message': 'Trainer not found!'}), 403
    
    cursor.execute('SELECT * FROM Payment WHERE trainer_id = %s', (trainer_id,))
    payments = cursor.fetchall()
    if payments is None:
        return jsonify({'message': 'No Payments were made!'}), 403
    
    cursor.close()  
    return jsonify({'Payments': payments,})