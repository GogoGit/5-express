const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// You were wondering how the schema got updated!  Well this is it + Default Data Imported (recipe.controllers.js)
//
// Starting Schema
// const RecipeSchema = new Schema({
//   title: String,
//   description: String,
//   image: String,
// });

// Updated Schema + Default Data Imported has been udpated!  (recipe.controllers.js)
const RecipeSchema = new Schema({
  title: String,
  created: {
    type: Date,
    default: Date.now,
  },
  description: String,
  image: String,
  ingredients: Array,
  preparation: Array,
});

module.exports = mongoose.model("Recipe", RecipeSchema); //add CRUD operations will live of Recipe, check out https://mongoosejs.com/docs/api/model.html
