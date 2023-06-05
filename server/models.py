from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    __tabelname__ = 'user'

    id       = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    # the flight stats for each user
    flights  = db.Column(db.Integer)
    crashes  = db.Column(db.Integer)
    total_commands = db.Column(db.String)
    meters_horizontal = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password
        }
    
class Commands(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    command = db.Column(db.String, nullable = False)
    user = db.Column(db.Integer, nullable = False)   

    def to_dict(self):
        return {
            'id': self.id,
            'command': self.command,
            'user':self.user
        }