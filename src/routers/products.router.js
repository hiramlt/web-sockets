import { Router } from "express";
import { __dirname } from "../utils.js";
import { v4 as uuidv4 } from 'uuid';
import { emit } from "../socket.js";
import { saveData, getData } from "../data.js";

const router = Router();

const validateFields = async (req, res, next) => {
    const { title, description, code, price, status, stock, category } = req.body;

    if (!title || !description || !code || !price || !status || !stock || !category){
        return res.status(400).json({ error: "Missing required fields"})
    }
    next();
};

const verifyExistence = async (req, res, next) => {
    const { code } = req.body;
    const products = await getData();

    const found = products.find((product) => product.code === code);
    if (found) return res.status(400).json({error: "Product already exists"});

    next();
}


router.get('/', (req, res) => {
    res.render('realTimeProducts', { title: "Productos" });
});

router.post('/', validateFields, verifyExistence, async (req, res) => {
    const { thumbnails, ...fields } = req.body;
    const products = await getData();

    const newProduct = {
        id: uuidv4(),
        ...fields,
    }
    
    products.push(newProduct);
    await saveData(products);
    emit('update-list', { products });
    res.status(201).send( {status: "Product saved successfully"});  
})


export default router;