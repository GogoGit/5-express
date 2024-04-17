function getRecipes() {
  document.querySelector(".recipes").innerHTML = ``;
  fetch(`api/recipes`)
    .then((response) => response.json())
    .then((recipes) => renderRecipes(recipes));
}

//Note this is a massive refresh as we DELETE All Entries
// We then get all the Recipes

//Here we create the HTML to show the data
function renderRecipes(recipes) {
  // console.log(recipes);
  recipes.forEach((recipe) => {
    let recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
      <img src="img/${recipe.image}" />
      <h3><a href="detail.html?recipe=${recipe._id}">${recipe.title}</a></h3>
      <p>${recipe.description}</p>
      <p>${recipe._id}</p>
      <a class="delete" data-id=${recipe._id} href="#">Delete</a>
    `;
    document.querySelector(".recipes").append(recipeEl);
  });
}

function addRecipe(event) {
  event.preventDefault();

  const { title, image, description } = event.target;

  const recipe = {
    title: title.value,
    image: image.value,
    description: description.value,
  };

  fetch("api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => response.json())
    .then(getRecipes);
}
// Note we would ideally want to just return the recipe we added and then just modify the code to add the recipe to our
// HTML VS downloading all the Recipies!!!

//Seems we are calling the submit somehow??? Commented out these 2 lines and somehow Toast was added without clicking the button.
const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addRecipe);

function deleteRecipe(event) {
  fetch(`api/recipes/${event.target.dataset.id}`, {
    method: "DELETE",
  }).then(location.reload());
}

function handleClicks(event) {
  if (event.target.matches("[data-id]")) {
    deleteRecipe(event);
  } //else if (event.target.matches("#seed")) {
  //   seed();
  // }
}

document.addEventListener("click", handleClicks);

getRecipes();
