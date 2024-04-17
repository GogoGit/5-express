const Recipe = require("./recipe.model");

// end points
exports.findAll = function (req, res) {
  Recipe.find({}).then((data) => res.send(data));
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Recipe.findOne({ _id: id }).then((data) => res.send(data));
};

//sending data from the front end to the back end
//Note we should send the data back to the form but here we are just sending OK STATUS!
exports.add = function (req, res) {
  Recipe.create(req.body).then(data);
};

exports.update = function () {};

exports.delete = function (req, res) {
  let id = req.params.id;
  Recipe.deleteOne({ _id: id }).then(res.sendStatus(202));
};

// Example to delete just one Item
// exports.killall = function (req, res) {
//   Recipe.deleteMany({ title: "Lasagna" }).then(res.sendStatus(202));
// };

// Delete all recipies
exports.killall = function (req, res) {
  Recipe.deleteMany({}).then(res.sendStatus(202));
};

//Creates some default Data!
//Note you need the (req,res) variables.. you can't just have(res)  becuase it thinks the res is the req variable!  (Positional Dependancy)
//https://mongoosejs.com/docs/api/model.html#Model.create()
exports.import = function (req, res) {
  Recipe.create([
    {
      title: "Lasagna",
      description:
        "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
      image: "lasagna.png",
    },
    {
      title: "Pho-Chicken Noodle Soup",
      description:
        'Pho (pronounced "fuh") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
      image: "pho.png",
    },
    {
      title: "Guacamole",
      description:
        "Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.",
      image: "guacamole.png",
    },
    {
      title: "Hamburger",
      description:
        "A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.",
      image: "hamburger.png",
    },
  ]).then(res.sendStatus(202));
};

//Creating some data
// app.get("/api/import", function (req, res) {
//   Recipe.create(
//     {
//       title: "Lasagna",
//       description:
//         "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
//       image: "lasagna.png",
//     },
//     {
//       title: "Pho-Chicken Noodle Soup",
//       description:
//         'Pho (pronounced "fuh") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
//       image: "pho.png",
//     },
//     {
//       title: "Guacamole",
//       description:
//         "Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.",
//       image: "guacamole.png",
//     },
//     {
//       title: "Hamburger",
//       description:
//         "A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.",
//       image: "hamburger.png",
//     }
//   ).then(res.sendStatus(201));
// });
