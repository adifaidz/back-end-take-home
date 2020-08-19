import {Product} from './../models';

async function list(req, res) {
    await Product.findAll().then((product) => {
        res.json(product);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

async function get(req, res) {
    const {id} = req.params;

    await Product.findOne({ where : {id} }).then((product) => {
        res.json(product);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

async function create(req, res) {
    const { name, desc } = req.body;
    await Product.create({ name, desc }).then((product) => {
        res.json(product);
    }).catch((err) => {
        res.status(500).json(err);;
    });
}

async function update(req, res) {
    const { id } = req.params;
    const { name, desc } = req.body;
    const product = await Product.findOne({ where: { id }});
    
    await product.update({ name, desc }).catch(err => {
        res.status(500).json(err);
    });

    res.status(200).json(product);
}

async function remove(req, res) {
    const { id } = req.params;
    const deleted = await Product.destroy({
        where: { id }
    });

    if(!deleted) 
        return res.sendStatus(404);

    res.sendStatus(200);
}

module.exports = {
    list,
    get,
    create,
    update,
    remove,
};