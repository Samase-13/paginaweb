from flask import Flask
from models.product_model import db
from routes.product_routes import product_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:lester.com@localhost/ecommerce'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar la base de datos
db.init_app(app)

# Registrar los Blueprints
app.register_blueprint(product_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Crear tablas si no existen
    app.run(debug=True, host='0.0.0.0', port=5000)
