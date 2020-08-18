import {Product} from './../models';

async function list(req, res) {
    await Product.findAll().then((product) => {
        res.json(product);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

async function create(req, res) {
    const { name, desc } = req.body;
    await Product.create(req.body).then((product) => {
        res.json(product);
    }).catch((err) => {
        res.status(500).json(err);;
    });
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
    create,
    remove,
};