import express from 'express';
import path from 'path';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routers/products.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, '../public')))

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/realtimeproducts', productsRouter);

app.use((error, req, res, next) => {
    const err = `Error desconocido: ${error.message}`;
    res.status(500).json({ error: err });  
})

export default app;