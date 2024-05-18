import re  
import os
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from database import db

from user import user
from exercise import exercise
from exercise_log import exercise_log
from workout import workout
from fitness_goal import fitness_goal
from achievement import achievement

CORS(db)

db.register_blueprint(user)
db.register_blueprint(exercise)
db.register_blueprint(exercise_log)
db.register_blueprint(workout)
db.register_blueprint(fitness_goal)
db.register_blueprint(achievement)

@db.route('/')

@db.route('/data', methods=['GET'])
def data():
    return "slm"

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 7437))
    db.run(debug=True, host='0.0.0.0', port=port)