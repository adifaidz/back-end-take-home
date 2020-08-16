import express from "express";
import helmet from "helmet";
import authRouter from './routes/auth';
import productRouter from './routes/product';
import warehouseRouter from './routes/warehouse';
import stockRouter from './routes/stock';

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/warehouse', warehouseRouter);
app.use('/stock', stockRouter);

app.listen(process.env.PORT, () => {
    console.log(`API started at port ${process.env.PORT}`);
});