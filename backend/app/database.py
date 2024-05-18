from flask import Flask
from flask_mysqldb import MySQL

db = Flask(__name__)
db.secret_key = 'abcdefgh'
db.config['MYSQL_HOST'] = 'db'
db.config['MYSQL_USER'] = 'root'
db.config['MYSQL_PASSWORD'] = 'password'
db.config['MYSQL_DB'] = 'fitnesstrackerdb'

mysql = MySQL(db)

def connect():
    return mysql.connection