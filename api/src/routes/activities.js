const { Router } = require("express");
const { Op } = require("sequelize");
const { Activity } = require("../db");
const router = Router();


router.get("/", async (req, res) => {
  try {
    const { name, order, orderBy, min, max, type, page } = req.query;

    
    const perPage = 6
    const offset = (page - 1) * perPage

    const conditions = {}
    if (name) (conditions.name = { [Op.like]: `%${name}%` });
    if (type) (conditions.type = type);

    if (min && max) conditions.price = { [Op.between]: [min, max] }
    else if (min) conditions.price = { [Op.gt]: min }
    else if (max) conditions.price = { [Op.lt]: max }

    const activities = await Activity.findAndCountAll({
      where: { ...conditions },
      order: [
        [orderBy || 'updatedAt', order || 'DESC']
      ],
      limit: perPage,
      offset: offset || 0,
    });
    let totalPages = Math.ceil(activities.count / perPage)

    res.status(200).json({ ...activities, totalPages, page: page || 1 })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const activity = await Activity.findByPk(id);
      res.json(activity);
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/", async (req, res) => {
  const { name, schedule, price, start_at, end_at, description,image, allowed_age, difficulty_level, type } = req.body;

  try {
    const activity = await Activity.create({ name, schedule, start_at, end_at, price, description, image, allowed_age, difficulty_level, type });
    res.status(200).json(activity);

  } catch (error) {
    console.log(error)
    res.status(404).send(error.message);
  }
});

router.put("/", async (req, res) => {
  const newData = req.body;
  const id = newData.id
  try {
    const activityModified = await Activity.update(newData, { where: { id } });
    res.json({ msg: "Activity updated" });
  } catch (error) {
    console.log(error);
  };

});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const activityToDelete = await Activity.findByPk(id);
  if (!activityToDelete) {
    res.status(404).json({ msg: "That activity do not exist brou" });
  } else if (activityToDelete.is_active) {
    res.status(400).json({ msg: "The activity must be diactivated before delete" });
  } else {
    try {
      await Activity.destroy({ where: { id } });
      res.json({ msg: "The activity has been delete successfully" });
    } catch (error) {
      console.log(error);
    }
  };
});

module.exports = router;
