import { link } from '../db/baza_conn.js'

class Akcje {
    getAllProducts(req, res) {
        const sql = "SELECT * FROM products";
        link.query(sql, (err, result) => {
            if (err) return res.status(422).json({ message: err.message });
            res.status(200).json(result);
        })
    }

    getProductById(req, res) {
        const id = req.params.id;
        const sql = `SELECT * FROM products WHERE id = ${id}`;
        link.query(sql, (err, result) => {
            if (err) return res.status(422).json({ message: err.message });
            if (result.length === 0) {
                return res.status(404).json({ message: "Produkt nie znaleziony" });
            }
            res.status(200).json(result[0]);
        })
    }

    createProduct(req, res) {
        const newProduct = { ...req.body };
        const sql = `INSERT INTO products(name, producent, category, price)
                     VALUES('${newProduct.name}', '${newProduct.producent}', '${newProduct.category}', ${newProduct.price});`;
        link.query(sql, (err, result) => {
            if (err) return res.status(422).json({ rezultat: false, message: err.message });
            if (result.affectedRows == 1)
                res.status(200).json({ rezultat: true, message: "Produkt dodany", id: result.insertId });
            else
                res.status(422).json({ rezultat: false, message: "Produktu nie dodano" });
        })
    }

    updateProduct(req, res) {
        const id = req.params.id;
        const product = { ...req.body };
        const sql = `UPDATE products SET 
                     name='${product.name}', 
                     producent='${product.producent}', 
                     category='${product.category}', 
                     price=${product.price} 
                     WHERE id=${id};`;
        link.query(sql, (err, result) => {
            if (err) return res.status(422).json({ rezultat: false, message: err.message });
            if (result.affectedRows == 1)
                res.status(200).json({ rezultat: true, message: "Produkt zaktualizowany" });
            else
                res.status(422).json({ rezultat: false, message: "Produktu nie zaktualizowano" });
        })
    }

    deleteProduct(req, res) {
        const id = req.params.id;
        const sql = `DELETE FROM products WHERE id=${id};`;
        link.query(sql, (err, result) => {
            if (err) return res.status(422).json({ rezultat: false, message: err.message });
            if (result.affectedRows == 1)
                res.status(200).json({ rezultat: true, message: "Produkt usunięty" });
            else
                res.status(422).json({ rezultat: false, message: "Produktu nie usunięto" });
        })
    }

    changePrice(req, res) {
        const wartosc = parseFloat(req.params.wartosc);
        if (isNaN(wartosc) || wartosc < 0) {
            return res.status(422).json({ rezultat: false, message: "Wartość musi być większa od 0" });
        }
        
        let mnoznik, info;
        if (wartosc > 1) {
            mnoznik = 1 + (wartosc / 100);
            info = `Podwyżka ${Math.floor(wartosc)}% zastosowana`;
        } else {
            mnoznik = 1 - wartosc;
            info = `Zniżka ${Math.floor(wartosc * 100)}% zastosowana`;
        }
        
        const sql = `UPDATE products SET price = price * ${mnoznik};`;
        link.query(sql, (err, result) => {
            if (err) return res.status(422).json({ rezultat: false, message: err.message });
            if (result.affectedRows > 0)
                res.status(200).json({ rezultat: true, message: info, zaktualizowano: result.affectedRows });
            else
                res.status(422).json({ rezultat: false, message: "Nie zaktualizowano żadnych produktów" });
        })
    }
}

const akcje = new Akcje();

export { akcje };
