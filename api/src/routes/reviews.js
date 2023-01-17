const { Router } = require("express");
const router = Router();
const { Review, User, Activity, Product } = require("../db");
const sequelize = require('sequelize');

router.get("/", async (req, res) => {
  try {
    let activity = await Activity.findAll({
      include: [{
        model: Review,
        as: 'activity_rating',
        attributes: []
      }],
      attributes: {
        include: [
          [sequelize.fn('AVG', sequelize.col('activity_rating.rating')), 'avgRating']
        ]
      },
      group: ['Activity.id'],
      order: [[sequelize.fn('AVG', sequelize.col('activity_rating.rating')), "DESC"]],
      raw: true
    })

    let reviewedActivities = activity.filter((e) => e.avgRating)

    let homeActivities = reviewedActivities.length < 6 ? activity : reviewedActivities

    res.json(homeActivities)
  } catch (error) {
    console.log(error)
  }

});

router.get("/details/activity", async (req, res) => {

  let { id } = req.query
  try {
    const activity = await Activity.findOne({
      where: { id: id },
      include: [{
        model: Review,
        as: 'activity_rating',
        attributes: []
      }],
      attributes: {
        include: [
          [sequelize.fn('AVG', sequelize.col('activity_rating.rating')), 'avgRating']
        ]
      },
      group: ['Activity.id'],
      raw: true
    })
    const reviews = await Review.findAll({
      where: { ActivityId: id },
      include: [{
        model: User,
        attributes: ["first_name", "last_name", "createdAt"]
      }],
    })

    res.json({ ...activity, reviews })

  } catch (error) {
    console.log(error)
  }

});

router.get("/details/product", async (req, res) => {

  let { id } = req.query
  try {
    const product = await Product.findOne({
      where: { id: id },
      include: [{
        model: Review,
        as: 'product_rating',
        attributes: []
      }],
      attributes: {
        include: [
          [sequelize.fn('AVG', sequelize.col('product_rating.rating')), 'avgRating']
        ]
      },
      group: ['Product.id'],
      raw: true
    })

    const reviews = await Review.findAll({
      where: { ProductId: id },
      include: [{
        model: User,
        attributes: ["first_name", "last_name", "createdAt"]
      }],
    })

    res.json({ ...product, reviews })
  } catch (error) {
    console.log(error)
  }
});


router.post("/activity", async (req, res) => {

  const { userId, id, rating, comments } = req.body

  try {
    const review = await Review.findOrCreate({
      where: {
        UserId: userId,
        ActivityId: id
      },
      defaults: {
        rating,
        comments
      }
    });

    // const activity = await Activity.findOne({ where: { id: id} });
    // const user = await User.findOne({ where: { id: userId } })

    // await activity.addActivity_rating(review)
    // await user.addReview(review)

    res.status(200).json(review)
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
})

router.post("/product", async (req, res) => {

  const { userId, id, rating, comments } = req.body

  try {
    const review = await Review.findOrCreate({
      where: {
        UserId: userId,
        ProductId: id
      },
      defaults: {
        rating,
        comments
      }
    });

    // const product = await Product.findOne({ where: { id: id } });
    // const user = await User.findOne({ where: { id: userId } })

    // await product.addReview(review)
    // await user.addReview(review)
    console.log('entramos a product');

    res.status(200).json(review)
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
})



module.exports = router;
