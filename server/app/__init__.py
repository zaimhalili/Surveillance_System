from flask import Flask
from config import Config
from app.db import initialize_database

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    initialize_database(app.config['DATABASE_PATH'])

    from app.routes import main_bp
    app.register_blueprint(main_bp)

    return app
