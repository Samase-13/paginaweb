from flask import Blueprint, jsonify, request
from models.product_model import db, Producto

product_bp = Blueprint('product_routes', __name__)

@product_bp.route('/api/productos', methods=['GET'])
def obtener_productos():
    productos = Producto.query.all()
    return jsonify([producto.to_dict() for producto in productos]), 200

@product_bp.route('/api/productos', methods=['POST'])
def agregar_producto():
    data = request.json
    if not all(key in data for key in ("name", "price", "img")):
        return jsonify({"error": "Datos incompletos"}), 400

    nuevo_producto = Producto(name=data["name"], price=data["price"], img=data["img"])
    db.session.add(nuevo_producto)
    db.session.commit()
    return jsonify({"message": "Producto agregado correctamente"}), 201
