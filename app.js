import express from "express";
import helmet from "helmet";
import authRouter from './routes/auth';
import productRouter from './routes/product';
import warehouseRouter from './routes/warehouse';
import Auth from './auth';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/auth', authRouter);
app.use('/products', Auth.authenticate('jwt', { session : false }) , productRouter);
app.use('/warehouses', Auth.authenticate('jwt', { session : false }), warehouseRouter);

app.listen(process.env.PORT, () => {
    console.log(`API started at port ${process.env.PORT}`);
});