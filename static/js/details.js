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
  recipeEl = document.createElement("div");
  recipeEl.innerHTML = `
      <img src="img/${recipe.image}" />
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <a href="/">Back</a>
      `;
  document.querySelector(".recipe").append(recipeEl);
}

showDetail();
