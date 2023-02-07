import express, { response } from "express";
import { Product_Manager } from "./productManager.js";
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    let totalProducts = await Product_Manager.getProducts();
    let limit = parseInt(req.query.limit)
    
    if (limit) {
        let productLimit = totalProducts.slice(0, limit)
        res.send(productLimit)
    } else {
        res.send(totalProducts);
    }

});

app.get('/products/:productId', async (req, res) => {
    const id = parseInt(req.params.productId)
    let products = await Product_Manager.getProducts()
    let limit = products.length

    if (id <= limit) {
        let productId = products.filter(el => el.id===id) 
        res.send(productId)
    }else{
        res.send({error:"El producto no existe"})
    }
})

const port = 8080;
app.listen(port, () => {
    console.log('Server listening at Port: ', port)
});

/*let arraylimit = []
    let x = 0
    if (limit) {
        while (x < limit) {
            arraylimit.push(totalProducts[x])
            x++
        }
        res.send(arraylimit)
    } //este método funciona para llamar a los objetos por límite pero si llamo a un número superior al objeto suma null.

    app.get('/products/:productId', async (req, res) => {
        const id = parseInt(req.params.productId)
        let productsById = await Product_Manager.getProductById(id)
        res.send(productsById);
    })*/ // método que toma los productos por id pero muestra error con el console.log de productManager.js