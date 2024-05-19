from flask import Blueprint, request, jsonify
import MySQLdb.cursors
from datetime import datetime, timedelta
from database import connect
import uuid

nutrition = Blueprint('nutrition', __name__, url_prefix='/nutrition')

@nutrition.route('/list', methods=['GET'])
def list_nutritions():
    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM Nutrition')
    nutritions = cursor.fetchall()
    cursor.close()

    return jsonify({'nutritions': nutritions})