from config import Config
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def obtener_conexion():
    """Crea y devuelve una conexión a la base de datos."""
    return f"mysql+pymysql://{Config.DB_USER}:{Config.DB_PASSWORD}@{Config.DB_HOST}/{Config.DB_NAME}"
