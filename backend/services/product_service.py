from services.db_service import DBService

class ProductService:
    @staticmethod
    def obtener_productos():
        """Obtiene todos los productos de la base de datos."""
        query = "SELECT id, name, price, img FROM productos"
        return DBService.ejecutar_consulta(query)

    @staticmethod
    def obtener_producto_por_id(product_id):
        """Obtiene un producto específico por ID."""
        query = "SELECT id, name, price, img FROM productos WHERE id = %s"
        return DBService.ejecutar_consulta(query, (product_id,))

    @staticmethod
    def agregar_producto(name, price, img):
        """Agrega un nuevo producto a la base de datos."""
        query = "INSERT INTO productos (name, price, img) VALUES (%s, %s, %s)"
        return DBService.ejecutar_modificacion(query, (name, price, img))
