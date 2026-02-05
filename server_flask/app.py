from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'Hardware_OAnkiewicz'


def connection():
    h = app.config['MYSQL_HOST']
    d = app.config['MYSQL_DB']
    u = app.config['MYSQL_USER']
    p = app.config['MYSQL_PASSWORD']
    link = pymysql.connect(host=h, user=u, password=p, database=d)
    return link

@app.route('/products', methods=['GET'])
@app.route('/products/', methods=['GET'])
def get_all_products():
    try:
        products = []
        link = connection()
        cursor = link.cursor()
        cursor.execute("SELECT * FROM products")
        for row in cursor.fetchall():
            products.append({"id": row[0], "name": row[1], "producent": row[2], "category": row[3], "price": row[4]})
        link.close()
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 422

@app.route('/products/<int:id>', methods=['GET'])
def get_product_by_id(id):
    try:
        link = connection()
        cursor = link.cursor()
        cursor.execute(f"SELECT * FROM products WHERE id = {id}")
        row = cursor.fetchone()
        link.close()
        if row is None:
            return jsonify({"message": "Produkt nie znaleziony"}), 404
        product = {"id": row[0], "name": row[1], "producent": row[2], "category": row[3], "price": row[4]}
        return jsonify(product), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 422

@app.route('/products', methods=['POST'])
@app.route('/products/', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        link = connection()
        cursor = link.cursor()
        sql = f"INSERT INTO products(name, producent, category, price) VALUES('{data['name']}', '{data['producent']}', '{data['category']}', {data['price']})"
        cursor.execute(sql)
        link.commit()
        insert_id = cursor.lastrowid
        link.close()
        if cursor.rowcount == 1:
            return jsonify({"rezultat": True, "message": "Produkt dodany", "id": insert_id}), 200
        else:
            return jsonify({"rezultat": False, "message": "Produktu nie dodano"}), 422
    except Exception as e:
        return jsonify({"rezultat": False, "message": str(e)}), 422

@app.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        data = request.get_json()
        link = connection()
        cursor = link.cursor()
        sql = f"UPDATE products SET name='{data['name']}', producent='{data['producent']}', category='{data['category']}', price={data['price']} WHERE id={id}"
        cursor.execute(sql)
        link.commit()
        link.close()
        if cursor.rowcount == 1:
            return jsonify({"rezultat": True, "message": "Produkt zaktualizowany"}), 200
        else:
            return jsonify({"rezultat": False, "message": "Produktu nie zaktualizowano"}), 422
    except Exception as e:
        return jsonify({"rezultat": False, "message": str(e)}), 422

@app.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        link = connection()
        cursor = link.cursor()
        sql = f"DELETE FROM products WHERE id={id}"
        cursor.execute(sql)
        link.commit()
        link.close()
        if cursor.rowcount == 1:
            return jsonify({"rezultat": True, "message": "Produkt usunięty"}), 200
        else:
            return jsonify({"rezultat": False, "message": "Produktu nie usunięto"}), 422
    except Exception as e:
        return jsonify({"rezultat": False, "message": str(e)}), 422


@app.route('/products/zmianaCeny/<wartosc>', methods=['PUT'])
def change_price(wartosc):
    try:
        wartosc = float(wartosc)
        if wartosc < 0:
            return jsonify({"rezultat": False, "message": "Wartość musi być większa od 0"}), 422
        
        if wartosc > 1:
            mnoznik = 1 + (wartosc / 100)
            info = f"Podwyżka {int(wartosc)}% zastosowana"
        else:
            mnoznik = 1 - wartosc
            info = f"Zniżka {int(wartosc * 100)}% zastosowana"
        
        link = connection()
        cursor = link.cursor()
        sql = f"UPDATE products SET price = price * {mnoznik}"
        cursor.execute(sql)
        link.commit()
        zaktualizowano = cursor.rowcount
        link.close()
        if zaktualizowano > 0:
            return jsonify({"rezultat": True, "message": info, "zaktualizowano": zaktualizowano}), 200
        else:
            return jsonify({"rezultat": False, "message": "Nie zaktualizowano żadnych produktów"}), 422
    except Exception as e:
        return jsonify({"rezultat": False, "message": str(e)}), 422


if __name__ == '__main__':
    app.run(debug=True, port=3005)