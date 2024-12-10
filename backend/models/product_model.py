from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Producto(db.Model):
    __tablename__ = 'productos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    img = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        """Convierte el modelo en un diccionario."""
        return {
            "id": self.id,
            "name": self.name,
            "price": float(self.price),
            "img": self.img,
        }
