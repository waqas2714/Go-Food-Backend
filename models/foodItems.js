const { default: mongoose, Schema } = require("mongoose");

const foodItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  
CategoryName:{
    type: String,
    required: true,
},
img:{
    type: String,
    required: true, 
},
options: {
  type: Array,
  half:{
    type : String
  },
  full:{
    type: String
  }
},
description: {
  type:String
}
});

module.exports = mongoose.model("food_items",foodItemsSchema);
