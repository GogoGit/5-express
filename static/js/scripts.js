function myDateConversion(strDate) {
  // Parse the ISO timestamp
  const isoTimestamp = "2024-04-19T20:30:41.936Z";
  const dateObject = new Date(isoTimestamp);

  // Extract the components
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[dateObject.getUTCMonth()];
  const day = dateObject.getUTCDate();
  const year = dateObject.getUTCFullYear();
  const hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();
  const seconds = dateObject.getUTCSeconds();

  // Create a formatted date string
  const formattedDate = `${month} ${day}, ${year} ${hours % 12}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${
    hours >= 12 ? "pm" : "am"
  }`;

  return formattedDate;
}

// function displayFormatArrayData(arrItems, strHeader, isOrderedList = false) {
function displayFormatArrayData(arrItems, strHeader, isOrderedList = false) {
  // let strHeader = "MY TEMP HEADER";
  const strLineItems = arrItems.map((item, index) => {
    // return `${index + 1}: ${item}`;
    return `<li>${item}</li>`;
  });

  let myTag = "ul";
  if (isOrderedList) {
    myTag = "ol";
  }

  return `<h4>${strHeader}</h4>
  <${myTag}>${strLineItems.join("")}</${myTag}>`;
}

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
  console.log(recipes);
  recipes.forEach((recipe) => {
    let convDate = myDateConversion(recipe.created);
    // <p>${recipe.created}</p>

    let recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
      
      <h3><a href="detail.html?recipe=${recipe._id}">${recipe.title}</a></h3>
      <p>${recipe._id}</p>
      <p>${convDate}</p>
      <img src="img/${recipe.image}" />
      <p>${recipe.description}</p>
      <p>${displayFormatArrayData(recipe.ingredients, "Ingredients")}</p>
      <p>${displayFormatArrayData(recipe.preparation, "Preparation")}</p>
      
      <a class="delete" data-id=${recipe._id} href="#">Delete</a>
    `;
    {
      /* <p>${displayFormatArrayData(recipe.ingredients, "Ingredients")}</p> */
    }
    {
      /* <p>${displayFormatArrayData(recipe.preperation, "Preperation", true)}</p> */
    }

    document.querySelector(".recipes").append(recipeEl);
  });
}

function addRecipe(event) {
  event.preventDefault();
  //Destructuring the data we want to use
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

function deleteRecipe(event) {
  console.log("deleteRecipe .....");
  console.log("2: ", event.target);
  fetch(`api/recipes/${event.target.dataset.id}`, {
    method: "DELETE",
  })
    .then((response) => {
      console.log("response");
      console.log(response);
    })
    .then((data) => {
      console.log("data");
      console.log(data);
    })
    .then(location.reload());
}

function handleClicks(event) {
  if (event.target.matches("[data-id]")) {
    deleteRecipe(event);
  } //else if (event.target.matches("#seed")) {
  //   seed();
  // }
}

document.addEventListener("click", handleClicks);

//Seems we are calling the submit somehow??? Commented out these 2 lines and somehow Toast was added without clicking the button.
const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addRecipe);

//Add Default Data Button
function addDataApiCall(event) {
  console.dir(event.target);
  console.log("add more data!!!");
  fetch(`api/import`)
    .then((response) => {
      console.log(response);
    })
    .then((data) => {
      console.log(data);
    });

  //Refresh Page
  console.log("Refresh Page");
  getRecipes();
}

const btnAddData = document.getElementById("add-data-button");
btnAddData.addEventListener("click", addDataApiCall);

//Delete All Data Button
function deleteDataApiCall(event) {
  console.dir(event.target);
  console.log("BURN IT TO THE GROUND!!!");
  fetch(`api/KillAll`)
    .then((response) => {
      console.log(response);
    })
    .then((data) => {
      console.log(data);
    });

  //Refresh Page
  console.log("Refresh Page");
  getRecipes();
}

const btnDeleteData = document.getElementById("delete-data-button");
btnDeleteData.addEventListener("click", deleteDataApiCall);

getRecipes();
