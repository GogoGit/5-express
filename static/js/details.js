function showDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipe");

  //Note:  By Default Fetch commands are 'GET' commands.  This makes it very clear what is going on!!!
  fetch(`api/recipes/${recipeId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((recipe) => renderRecipe(recipe));
}

function renderRecipe(recipe) {
  //Destructuring the data we want to use
  // const { image, title, description } = recipe;
  const { image, title, description, ingredients, preparation } = recipe;
  console.log(ingredients);

  let strIngredients = "";
  strIngredients += ingredients.map((item) => {
    return `${item}`;
  });

  console.log(strIngredients);
  let recipeEl = document.createElement("div");
  recipeEl.innerHTML = `
      <img src="img/${recipe.image}" />
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <a href="/">Back</a>
      `;

  editForm.title.value = title;
  editForm.image.value = image;
  editForm.description.value = description;
  editForm.ingredients.value = strIngredients;

  document.querySelector(".recipe").append(recipeEl);
}

const updateRecipe = (event) => {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("recipe");
  const { title, image, description, ingredients } = event.target;

  objIngredients = [];
  arrIngredients = ingredients.value.split(",");
  arrIngredients.map((item, index) => {
    objIngredients[index] = `${item}`;
  });

  const updatedRecipe = {
    _id: recipeId,
    title: title.value,
    image: image.value,
    description: description.value,
    ingredients: objIngredients,
  };

  console.log(updatedRecipe.ingredients);

  fetch(`api/recipes/${recipeId}`, {
    method: "PUT",
    body: JSON.stringify(updatedRecipe),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(showDetail);
};

const editForm = document.querySelector("#editForm");
editForm.addEventListener("submit", updateRecipe);

showDetail();
