const mongoose = require("mongoose");

const foodCategorySchema = mongoose.Schema({
  CategoryName: {
    type: String
  }
});

const Categories = mongoose.model("food_categories", foodCategorySchema);
module.exports = Categories;
