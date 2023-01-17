const { Router } = require("express");
const { Op } = require("sequelize");
const { Product } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name, order, orderBy, min, max, page, id } = req.query;

    const perPage = 6
    const offset = (page - 1) * perPage

    const conditions = {}
    if (name) (conditions.name = { [Op.like]: `%${name}%` });
    if (id) (conditions.id = id);

    if (min && max) conditions.price = { [Op.between]: [min, max] }
    else if (min) conditions.price = { [Op.gt]: min }
    else if (max) conditions.price = { [Op.lt]: max }

    const products = await Product.findAndCountAll({
      where: { ...conditions },
      order: [
        [orderBy || 'updatedAt', order || 'DESC']
      ],
      limit: perPage,
      offset: offset || 0,
    });
    let totalPages = Math.ceil(products.count / perPage)

    res.status(200).json({ ...products, totalPages, page: page || 1 })
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if(id){
    try {
      const product = await Product.findByPk(id);
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/", async (req, res) => {
  let { name, price, image, stock, description } = req.body;
  try {
    const product = await Product.create({name, image, price, stock, description});
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send(error)
  }
});

router.put("/", async (req, res) => {
  const newData = req.body;
  const id = newData.id
  try {
    const productModified = await Product.update(newData, { where: { id } });
    res.json({ msg: "Product updated" });
  } catch (error) {
    console.log(error);
  };

});


module.exports = router;
