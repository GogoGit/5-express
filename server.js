const express = require("express");
const mongoose = require("mongoose");
const fileuplaod = require("express-fileupload");
const recipeControllers = require("./api/recipe.controllers");
const app = express();

//MiddleWare Section
app.use(express.static("static"));
//Let's the server know how to parse the data... ie:  urlencoded or json payloads.
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(fileuplaod);

// Route - index.html file
//note (req, res, next) format
//Routes  These represent the CRUD operations
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/index.html"); //__dirname is special function that gives the directory of the server location where this is running
});

app.get("/api/recipes", recipeControllers.findAll);
app.get("/api/recipes/:id", recipeControllers.findById);
app.post("/api/recipes", recipeControllers.add);
app.put("/api/recipes/:id", recipeControllers.update);
app.delete("/api/recipes/:id", recipeControllers.delete);
app.get("/api/import", recipeControllers.import);
app.get("/api/killall", recipeControllers.killall);
app.post("/api/upload", recipeControllers.upload);

const PORT = process.env.PORT || 3000; //Not using the .env file as yet.
const dataBaseURL = process.env.DB_URL || "mongodb://localhost:27017";

// .connect(dataBaseURL, { useNewUrlParser: true })  deprecated option no longer needed
mongoose
  .connect(dataBaseURL, {})
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
