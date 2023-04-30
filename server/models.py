from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask
from flask_cors import CORS


a = 4

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

migrate = Migrate(app, db)

class User(db.Model):
    __tabelname__ = 'user'

    id       = db.Column(db.Integer, primary_key = True)

    username     = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)