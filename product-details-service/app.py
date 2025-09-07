from flask import Flask, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sample product data
products = [
    {"id": 1, "name": "MacBook Pro", "category": "Laptops", "description": "High-performance laptop"},
    {"id": 2, "name": "iPhone 15", "category": "Smartphones", "description": "Latest iPhone model"},
    {"id": 3, "name": "Samsung Galaxy S24", "category": "Smartphones", "description": "Android flagship phone"},
    {"id": 4, "name": "Dell XPS 13", "category": "Laptops", "description": "Ultrabook laptop"},
    {"id": 5, "name": "iPad Air", "category": "Tablets", "description": "Lightweight tablet"}
]

@app.route('/')
def health_check():
    return jsonify({"status": "Product Details Service is running"})

@app.route('/products', methods=['GET'])
def get_products():
    logger.info("Getting all products")
    return jsonify(products)

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    logger.info(f"Getting product with ID: {product_id}")
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        return jsonify(product)
    else:
        return jsonify({"error": "Product not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)