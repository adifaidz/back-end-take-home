import {Warehouse, WarehouseProducts} from '../models';

async function list(req, res) {
    await Warehouse.findAll().then((warehouse) => {
        res.json(warehouse);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

async function get(req, res) {
    const {id} = req.params;

    await Warehouse.findOne({ where : {id} }).then((warehouse) => {
        res.json(warehouse);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

async function create(req, res) {
    const { name, desc } = req.body;
    await Warehouse.create({ name, desc }).then((warehouse) => {
        res.json(warehouse);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

async function update(req, res) {
    const { id } = req.params;
    const { name, desc } = req.body;

    const warehouse = await Warehouse.findOne({ where: { id }});
    
    await warehouse.update({ name, desc }).catch(err => {
        res.status(500).json(err);
    });

    res.status(200).json(warehouse);
}

async function remove(req, res) {
    const { id } = req.params;
    const deleted = await Warehouse.destroy({
        where: { id }
    });

    if(!deleted) 
        return res.sendStatus(404);

    res.sendStatus(200);
}

async function stocks(req, res) {
    const { warehouseId, productId } = req.params;
    
    const record = await WarehouseProducts.findOne({
        where: { warehouseId, productId },
    }).catch((err) => {
        res.status(500).json(err);
    });

    if(!record)
        return res.sendStatus(404);

    res.status(200).json({
        quantity: record.quantity
    });

}

async function restock(req, res) {
    const { warehouseId, productId } = req.params;
    const { amount } = req.body;

    const record = await WarehouseProducts.findOne({
        where: {
            warehouseId,
            productId
        },
    }).catch((err) => {
        res.status(500).json(err);
    });

    if (!record)
        return res.sendStatus(404);

    await record.update({ quantity: record.quantity + amount }).catch((err) => {
        res.status(500).json(err);
    });

    res.status(200).json(record);
}

async function unstocks(req, res) {
    const { warehouseId, productId } = req.params;
    const { amount } = req.body;

    const record = await WarehouseProducts.findOne({
        where: {
            warehouseId,
            productId
        },
    }).catch((err) => {
        res.status(500).json(err);
    });

    if (!record)
        return res.sendStatus(404);

    if(amount > record.quantity)
        return res.status(422).json({
            message: 'Amount must be less equal to ' + record.quantity
        });

    await record.update({ quantity: record.quantity - amount }).catch((err) => {
        res.status(500).json(err);
    });

    res.status(200).json(record);
}

module.exports = {
    list,
    get,
    create,
    update,
    remove,
    stocks,
    restock,
    unstocks,
};