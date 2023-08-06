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
    
    # the info for each user
    id       = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    old_user = db.Column(db.Boolean, default=    False)
    # the flight stats for each user
    flights           = db.Column(db.Integer, default = 0)
    attempted_flights = db.Column(db.Integer, default = 0)
    crashes           = db.Column(db.Integer, default = 0)
    total_commands    = db.Column(db.Integer, default = 0)
    meters_horizontal = db.Column(db.Integer, default = 0)
    meters_vertical   = db.Column(db.Integer, default = 0)

    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'flights': self.flights,
            'attempted_flights': self.attempted_flights,
            'crashes': self.crashes,
            'total_commands': self.total_commands,
            'meters_horizontal': self.meters_horizontal,
            'meters_vertical': self.meters_vertical,
            'old_user': self.old_user,
            # 'saved_route': Commands.query.filter(Commands.user == self.id).first().to_dict()
        }
    
class Commands(db.Model):
    id                        = db.Column(db.Integer, primary_key = True)
    user                      = db.Column(db.Integer, nullable = False)  
     
    selected_commands         = db.Column(db.String)
    selected_commands_name    = db.Column(db.String)
    selected_commands_created = db.Column(db.DateTime)

    marker_commands           = db.Column(db.String)
    marker_commands_name      = db.Column(db.String)
    marker_commands_created   = db.Column(db.DateTime)


    def to_dict(self):
        return {
            'id': self.id,
            'selected_commands': self.selected_commands,
            'marker_commands': self.marker_commands,
            'user':self.user,
            'selected_commands_name': self.selected_commands_name,
            'selected_commands_created': self. selected_commands_created,
            'marker_commands_name': self.marker_commands_name,
            'marker_commands_created': self.marker_commands_created

        }