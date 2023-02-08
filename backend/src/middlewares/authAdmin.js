const Food = require("../models/food.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authAdmin = async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json("Token Not Found");

  try {
    const token = authHeader.split(" ")[1];
    // console.log("token:", token);

    //decodes token id
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // console.log(food.userID.toString(), decoded.id.toString());

    if (food.userID.toString() !== decoded.id.toString()) {
      return res.status(403).json("You are not allowed to do this");
    }

    next();
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { authAdmin };
