import re  
import os
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from database import db

from user import user
from exercise import exercise
from exercise_log import exercise_log
from fitness_goal import fitness_goal
from achievement import achievement
from workout import workout
from chat import chat
from trainer_session import trainer_session

CORS(db)

db.register_blueprint(user)
db.register_blueprint(exercise)
db.register_blueprint(exercise_log)
db.register_blueprint(fitness_goal)
db.register_blueprint(achievement)
db.register_blueprint(workout)
db.register_blueprint(chat)
db.register_blueprint(trainer_session)

@db.route('/')

@db.route('/data', methods=['GET'])
def data():
    return "slm"

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 7437))
    db.run(debug=True, host='0.0.0.0', port=port)