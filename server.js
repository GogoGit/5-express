const express = require("express");
const mongoose = require("mongoose");
const recipeControllers = require("./api/recipe.controllers");
const app = express();
const dataBaseURL = process.env.DB_URL || "mongodb://localhost:27017";

app.use(express.static("static"));

// Route - index.html file
//note (req, res, next) format
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

//Routes  These represent the CRUD operations
app.get("/api/recipes", recipeControllers.findAll);
app.get("/api/recipes/:id", recipeControllers.findById);
app.post("/api/recipes", recipeControllers.add);
app.put("/api/recipes/:id", recipeControllers.update);
app.delete("/api/recipes/:id", recipeControllers.delete);

// .connect(dataBaseURL, { useNewUrlParser: true })  deprecated option no longer needed
mongoose
  .connect(dataBaseURL, {})
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000; //Not using the .env file as yet.
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
