const router = require("express").Router();
const Food = require("../models/food.model");
const { protect } = require("../middlewares/authMiddleware");
const { authAdmin } = require("../middlewares/authAdmin");

// addfood
router.post("/add", protect, async (req, res) => {
  let { name, image, ingredients, recipe } = req.body;

  try {
    if (!name || !image || !ingredients || !recipe) {
      return res.status(420).json("All fields required");
    }

    const FoodData = req.body;

    const newFood = new Food(FoodData);
    const savedFood = await newFood.save();

    res.status(201).json(savedFood);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// updatefood
router.patch("/update/:id", authAdmin, async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await Food.findByIdAndUpdate(id, payload);
    res.status(200).send("Food data updated successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Read
router.get("/", async (req, res) => {
  const { name, ingredients } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (ingredients) {
    queryObject.ingredients = {
      $elemMatch: { $regex: ingredients, $options: "i" },
    };
  }

  try {
    const Foods = await Food.find(queryObject);
    res.status(200).send(Foods);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;