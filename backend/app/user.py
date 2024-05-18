from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
import uuid

user = Blueprint('user', __name__, url_prefix='/user')

@user.route('/login/fe', methods=['POST'])
def login_fe():
    email = request.json['email']
    password = request.json['password']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM User WHERE email = %s AND password = %s', (email, password))
    user = cursor.fetchone()
    if user is None:
        return jsonify({'message': 'Invalid credentials!'})
    cursor.execute('SELECT * FROM FitnessEnthusiast WHERE fe_id = %s', (user['user_id'],))
    user = cursor.fetchone()
    if user is None:
        return jsonify({'message': 'Invalid credentials!'})
    cursor.close()

    return jsonify({'message': 'Login successful!', 'user': user})

@user.route('/login/trainer', methods=['POST'])
def login_trainer():
    email = request.json['email']
    password = request.json['password']

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM User WHERE email = %s AND password = %s', (email, password))
    user = cursor.fetchone()
    if user is None:
        return jsonify({'message': 'Invalid credentials!'})
    cursor.execute('SELECT * FROM Trainer WHERE trainer_id = %s', (user['user_id'],))
    user = cursor.fetchone()
    if user is None:
        return jsonify({'message': 'Invalid credentials!'})
    cursor.close()

    return jsonify({'message': 'Login successful!', 'user': user})

@user.route('/register/fe', methods=['POST'])
def register_fe():
    user_id = uuid.uuid4().int
    print(user_id, flush=True)
    email = request.json['email']
    password = request.json['password']
    first_name = request.json['first_name']
    middle_name = request.json['middle_name']
    last_name = request.json['last_name']
    
    fe_id = user_id
    weight = request.json['weight']
    height = request.json['height']
    age = request.json['age']
    gender = request.json['gender']

    # Check if user already exists
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM User WHERE user_id = %s', (user_id,))
    if cursor.fetchone() is not None:
        return jsonify({'message': 'User already exists!'})

    # Insert user and fitness enthusiast data
    cursor.execute('INSERT INTO User (user_id, email, password, first_name, middle_name, last_name) VALUES (%s, %s, %s, %s, %s, %s)', (user_id, email, password, first_name, middle_name, last_name))
    cursor.execute('INSERT INTO FitnessEnthusiast (fe_id, weight, height, age, gender) VALUES (%s, %s, %s, %s, %s)', (fe_id, weight, height, age, gender))
    connection.commit()
    cursor.close()
    return jsonify({'message': 'User registered successfully!'})

@user.route('/register/trainer', methods=['POST'])
def register_trainer():
    user_id = uuid.uuid4().int
    email = request.json['email']
    password = request.json['password']
    first_name = request.json['first_name']
    middle_name = request.json['middle_name']
    last_name = request.json['last_name']
    
    trainer_id = user_id
    gender = request.json['gender']
    fee = request.json['fee']
    description = request.json['description']
    specialization = request.json['specialization']
    experience = request.json['experience']
    ratings = 0

    # Check if user already exists
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM User WHERE user_id = %s', (user_id,))
    if cursor.fetchone() is not None:
        return jsonify({'message': 'User already exists!'})

    # Insert user and trainer data
    cursor.execute('INSERT INTO User (user_id, email, password, first_name, middle_name, last_name) VALUES (%s, %s, %s, %s, %s, %s)', (user_id, email, password, first_name, middle_name, last_name))
    cursor.execute('INSERT INTO Trainer (trainer_id, gender, fee, description, specialization, experience, ratings) VALUES (%s, %s, %s, %s, %s, %s, %s)', (trainer_id, gender, fee, description, specialization, experience, ratings))
    connection.commit()
    cursor.close()
    return jsonify({'message': 'Trainer registered successfully!'})