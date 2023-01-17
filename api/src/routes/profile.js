const { Router } = require("express");
const { User, Activity, Product, Review } = require("../db");
// const { requiresAuth } = require('express-openid-connect');
const router = Router();

router.get("/services", async (req, res) => {
  try {
    const { idUser } = req.query;

    const user = await User.findOne({ where: { id: idUser } })

    const userActivities = await user.getActivities({
      include: [{
        model: Review,
        as: 'activity_rating',
        attributes: ["rating", "UserId"],
      }]
    });

    const userProducts = await user.getProducts({
      include: [{
        model: Review,
        as: 'product_rating',
        attributes: ["rating", "UserId"],
      }]
    });

    res.json({ userActivities, userProducts })
  } catch (error) {
    console.log(error)
    res.status(404).json(error);
  }
});

// ruta para cuando se hizo efectiva la compra de un producto
router.post("/association/:idUser", async (req, res) => {
  try {

    const { idUser } = req.params;
    const services = req.body

    console.log({ idUser, services })

    const user = await User.findOne({ where: { id: idUser } })

    services.forEach(async (e) => {
      if (e.category == 'activity') {
        const activity = await Activity.findOne({ where: { id: e.id } });
        await user.addActivity(activity);
      } else if (e.category == 'product') {
        const product = await Product.findOne({ where: { id: e.id } });
        await user.addProduct(product);
      }
    });


   res.json({message: "ok"})

  } catch (error) {
    console.log(error)
    res.status(404).json(error);
  }
});



router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const users = await User.findAll();
  console.log(users);
  const userProfile = await users.filter(u => u.username === username);
  console.log(userProfile);

  username ? res.json(userProfile) : res.status(404).json({ msg: "User not found!" });
});

module.exports = router;