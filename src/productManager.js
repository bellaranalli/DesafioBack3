//const fs = require("fs")
import fs from "fs";

class ProductManager {
    constructor(products) {
        this.products = products;
    }
    // agrego todos los productos y creo .txt
    addproduct(title, description, price, thumbnail, code, stock) {
        if (fs.existsSync('./Productos.json')) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8")
            let producto = JSON.parse(Producto);
            if (producto.some(products => products.code == code)) {
                console.error("el producto ya existe");
            }
            else {
                producto.push({
                    name: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    id: producto[producto.length - 1].id + 1
                })
            }
            fs.writeFileSync("./Productos.json", JSON.stringify(producto));
        }
        else {
            if (this.products.some(products => products.code == code)) {
                console.error("el producto ya existe");
            }
            else {
                this.products.push({
                    name: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    id: this.products.length + 1
                });
            }
            fs.writeFileSync("./Productos.json", JSON.stringify(this.products));
        }

    }

    getProducts() {
        if (fs.existsSync("./Productos.json")) {
            let archivo = fs.readFileSync("./Productos.json", "utf-8")
            let contenido = JSON.parse(archivo)
            return contenido
        }
    }

    getProductById(id) {
        if (fs.existsSync("./Productos.json")) {
            let Producto = fs.readFileSync("./Productos.json", "utf-8")
            let producto = JSON.parse(Producto)
            if (producto.some(products => products.id == id)) {
                let producto_buscado = producto.filter(products => products.id == id)
                return producto_buscado;
            }
            else {
                return ("El producto no existe")
            }
        }
    }
    //elimino un producto por id (en este caso el id 1 que es "zapatos" y reescribo el .txt)

    deleteProductById(id) {
        let Producto = fs.readFileSync("./Productos.json", "utf-8")
        let producto = JSON.parse(Producto)
        const deleteProduct = producto.find(products => products.id === id);
        if (deleteProduct) {
            const productsIndex = producto.indexOf(deleteProduct);
            producto.splice(productsIndex, 1);
            fs.writeFileSync("./Productos.json", JSON.stringify(producto))
        } else {
            console.error('el producto con el id ${id} no existe');
        }
    }

    //actualizo precio producto por id (en este caso el id 2 que es "botas" y reescribo el .txt)
    updateProductById(id) {
        let Producto = fs.readFileSync("./Productos.json", "utf-8")
        let producto = JSON.parse(Producto)
        let newPrice = "250"
        producto.map(function (dato) {
            if (dato.id == id) {
                dato.price = newPrice
            }
            return dato;
        });
        fs.writeFileSync("./Productos.json", JSON.stringify(producto))
    }

}
export const Product_Manager = new ProductManager("./src/products.json");

//Product_Manager.getProductById(3); //llamo por id a un producto y si no existe lo muestro por consola al mensaje, en este caso muestra Zapatilla
//Product_Manager.deleteProductById(1) //borro producto con id 1, en este caso Zapato
//Product_Manager.updateProductById(2) //modifico dato de producto por id 2, en este caso Bota

//Esto de abajo es en caso de que quiera agregar un producto:
//Product_Manager.addproduct("Zapato", "Cuero", "$100", "aca va una imagen", 90, 4);
//Product_Manager.addproduct("Bota", "caña alta", "$100", "aca va una imagen", 43, 4);
//Product_Manager.addproduct("Zapatilla", "running", "$100", "aca va una imagen", 86, 4);
//Product_Manager.addproduct("Zandalia", "Cuero", "$100", "aca va una imagen", 91, 4);
//Product_Manager.addproduct("Ojota", "playa", "$100", "aca va una imagen", 45, 4);
//Product_Manager.addproduct("Zapatilla", "urbana", "$100", "aca va una imagen", 87, 4);
//Product_Manager.addproduct("Pantufla", "corderito", "$100", "aca va una imagen", 40, 4);
//Product_Manager.addproduct("Bota", "caña corta", "$100", "aca va una imagen", 80, 4);
//Product_Manager.addproduct("Medias", "algodón", "$100", "aca va una imagen", 11, 4);
//Product_Manager.addproduct("Soquetes", "nylon", "$100", "aca va una imagen", 12, 4);

//Muestro todos los productos
//Product_Manager.getProducts() //muestra todos los productos con el comando node productManager.js


