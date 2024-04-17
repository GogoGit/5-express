//Note this is a massive refresh as we DELETE All Entries
// We then get all the Recipes
function getRecipes() {
  document.querySelector(".recipes").innerHTML = ``;
  fetch(`api/recipes`)
    .then((response) => response.json())
    .then((recipes) => renderRecipes(recipes));
}

//Here we create the HTML to show the data
function renderRecipes(recipes) {
  recipes.forEach((recipe) => {
    let recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
        <img src="img/${recipe.image}" />
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
      `;
    document.querySelector(".recipes").append(recipeEl);
  });
}

function addRecipe(event) {
  event.preventDefault();
  console.log(event.target);
  const { title, image, description } = event.target;
  console.log(title, image, description);

  const recipe = {
    title: title.value,
    image: image.value,
    description: description.value,
  };

  // Note: The following creates the following
  // fetch("api.recipies", {

  fetch("api/recipies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => response.json)
    .then(getRecipes);

  // Note we would ideally want to just return the recipe we added and then just modify the code to add the recipe to our
  // HTML VS downloading all the Recipies!!!
}

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addRecipe);

getRecipes();
