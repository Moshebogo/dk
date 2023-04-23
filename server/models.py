from app import db, app
from flask_migrate import Migrate

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


migrate = Migrate(app, db)




class User(db.Model):
    id       = db.Column(db.Integer, primary_key = True)

    name     = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)