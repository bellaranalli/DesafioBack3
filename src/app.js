import express from "express";
import { Product_Manager } from "./productManager.js";
const app = express();
app.use(express.urlencoded({ extended: true }))

/*app.get('/products', (req, res) => {
    const { limit } = req.query
    Product_Manager.getProducts().then((products) => {
        if (products.length === 0) return res.send('No items')
        if (limit) {
            return res.send(products.slice(0, limit))
        }
        res.send(products)
    }).catch(err => {
        res.send(`Ha ocurrido un error ${err} al cargar la página`)
    })
})*/

app.get('/products', async (req, res) => {
    let totalProducts = await Product_Manager.getProducts();
    res.send(totalProducts)

});

app.get('/products/:productId', async (req, res) => {
    const id = req.params.productId
    let productsById = await Product_Manager.getProductById(id)
    res.send(productsById)
})

const port = 8080;
app.listen(port, () => {
    console.log('Server listening at Port: ', port)
});


