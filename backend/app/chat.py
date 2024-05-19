from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from database import connect
from datetime import datetime, timedelta
import uuid

chat = Blueprint('chat', __name__, url_prefix='/chat')

@chat.route('/start', methods=['POST'])
def start_chat():
    chat_id = str(uuid.uuid4())
    session_id = request.json['session_id']
    start_date = datetime.now() + timedelta(hours=3)

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    # Check if chat already exists
    cursor.execute('SELECT * FROM Chat WHERE session_id = %s', (session_id))
    if cursor.fetchone() is not None:
        return jsonify({'message': 'Chat already exists!'}), 403

    # Insert new chat
    cursor.execute('INSERT INTO Chat (chat_id, session_id, start_date) VALUES (%s, %s, %s)', 
                   (chat_id, session_id, start_date))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Chat started successfully!', 'chat_id': chat_id})

@chat.route('/send_message', methods=['POST'])
def send_message():
    message_id = str(uuid.uuid4())
    chat_id = request.json['chat_id']
    session_id = request.json['session_id']

    owner_id = request.json['owner_id']
    content = request.json['content']
    date_time = datetime.now() + timedelta(hours=3)

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    # Check if chat exists
    cursor.execute('SELECT * FROM Chat WHERE chat_id = %s AND session_id = %s', (chat_id, session_id))
    if cursor.fetchone() is None:
        return jsonify({'message': 'Chat does not exist!'}), 403

    # Insert new message
    cursor.execute('INSERT INTO Message (message_id, chat_id, session_id, content, date_time, owner_id) VALUES (%s, %s, %s, %s, %s, %s)', 
                   (message_id, chat_id, session_id, content, date_time, owner_id))
    connection.commit()
    cursor.close()

    return jsonify({'message': 'Message sent successfully!', 'message_id': message_id})

@chat.route('/get_messages', methods=['GET'])
def get_messages():
    chat_id = request.args.get('chat_id')
    session_id = request.args.get('session_id')
   
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    # Retrieve messages for the chat
    cursor.execute('SELECT * FROM Message WHERE chat_id = %s AND session_id = %s ORDER BY date_time', 
                   (chat_id, session_id))
    messages = cursor.fetchall()
    cursor.close()

    return jsonify({'messages': messages})