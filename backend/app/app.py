import re  
import os
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from database import db

from user import user

CORS(db)

db.register_blueprint(user)

@db.route('/')

@db.route('/data', methods=['GET'])
def data():
    return "slm"

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 7437))
    db.run(debug=True, host='0.0.0.0', port=port)