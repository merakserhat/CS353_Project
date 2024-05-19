import MySQLdb.cursors
from flask import Blueprint, request, jsonify
from database import connect
import uuid
import random

recommendations = Blueprint('recommendations', __name__, url_prefix='/recommendations')

@recommendations.route('/take', methods=['GET'])
def take_recom():
    fe_id = request.json['fe_id'] 

    connection = connect()
    cursor = connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute('SELECT * FROM Recommendations')
    recommendations = cursor.fetchall()

    if not recommendations:
        return jsonify({'message': 'No recommendations available!'}), 404

    recommendation = random.choice(recommendations)

    cursor.execute('INSERT INTO recieves_recom (recommendation_id, fe_id) VALUES (%s, %s)', (recommendation['recommendation_id'], fe_id))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({'recommendation': recommendation})
