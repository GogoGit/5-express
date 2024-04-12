const express = require("express");
const app = express();

// our first route
app.get("/", function (req, res) {
  res.send("Hello from the backend.");
});

// our second route
app.get("/music", function (req, res) {
  res.send(`
      <h1>music</h1>
      <p>Commentary on music will go here.</p>
      `);
});

// our third route
app.get("/music/:type", function (req, res) {
  let type = req.params.type;
  res.send(`
      <h1>Music - ${type.toUpperCase()}</h1>
      <p>Commentary on ${type} music will go here.</p>
      `);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`)); // This is to the console, not the browser
