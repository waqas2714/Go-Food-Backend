const express = require("express");
const router = express.Router();
const FoodItems = require('../models/foodItems');
const Categories = require('../models/foodCategory');

router.get('/getFoodItems',async(req,res)=>{
    try {
        const foodCategory = await Categories.find();
        const foodItems = await FoodItems.find();
        res.json([foodItems, foodCategory]);
    } catch (err) {
        res.json({message : err.message});
        res.json({success : false})
    }
    

})

module.exports = router;