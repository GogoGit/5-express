function myDateConversion(strDate, isMilitaryTime = false) {
  //Error:  please enter a valid value the two nearest valid value is?
  //https://aaronsaray.com/2015/error-validating-seconds-in-html5-time-input/
  /*“Please enter a valid value. The two nearest valid values are…” - that didn’t make any sense to me.
      Well, turns out that every number field in html5 spec is using step=1 on the input fields - however, 
      time is using step=60 - as in 60 seconds. (I guess the authors preferred minutes over seconds). The 
      spec clearly defines this - but I guess I just missed that part.

    Hopefully it saves you some time too - in the end, this is what I changed my input field to - and it worked!

    <input step="1" type="time" name="the-time"> 
  */

  const dateObject = new Date(strDate);
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

  let hours = 0;
  let am_pm = "";

  if (isMilitaryTime) {
    hours = dateObject.getHours();
    am_pm = "";
  } else {
    hours = dateObject.getHours() % 12;
    am_pm = `${dateObject.getHours() >= 12 ? "pm" : "am"}`;
  }

  const month = monthNames[dateObject.getUTCMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  // Create a formatted date string
  // const formattedDate = `${month} ${day}, ${year} ${hours % 12}:${minutes
  //   .toString()
  //   .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`;
  const formattedDate = `${year}-${dateObject
    .getUTCMonth()
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}T${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")} ${am_pm}`;

  return formattedDate.trim();
}

function displayFormatedListData(items, strHeader, isOrderedList = false) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

  //Tried using typeof to differentiate arrays from objects which didn't work
  strLineItems = "";
  switch (strHeader.toLocaleLowerCase()) {
    case "ingredients":
      strLineItems = items.map((item, index) => {
        // return `${index + 1}: ${item}`;
        return `<li>${item}</li>`;
      });

      //remove ','
      strLineItems = strLineItems.join("");
      break;

    case "preparation":
      for (index in items) {
        for (key in items[index]) {
          // console.log(items[index].key);  //Not sure why this doesn't work ????
          console.log(items[index][key]);
          strLineItems += `<li>${items[index][key]}</li>\n`;
        }
      }
      break;

    default:
      console.warn(
        `Unknown Header '${strHeader}' used in function displayFormatedListData`
      );
  }

  //Determine what type of list
  let myTag = "ul";
  if (isOrderedList) {
    myTag = "ol";
  }

  return `<h4>${strHeader}</h4>
  <${myTag}>${strLineItems}</${myTag}>`;
}

function displayUpdateCreateDate() {
  const elem = document.getElementById("createDate");
  elem.value = myDateConversion(Date(), true);
}

function getRecipes() {
  updateUploadStatus("");
  displayUpdateCreateDate();
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
    let convDate = myDateConversion(recipe.created).replace("T", " ");
    displayUpdateCreateDate;

    let recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
      
      <h3><a href="detail.html?recipe=${recipe._id}">${recipe.title}</a></h3>
      <p>${recipe._id}</p>
      <p>${convDate}</p>
      <img src="img/${recipe.image}" />
      <p>${recipe.description}</p>
      <p>${displayFormatedListData(recipe.ingredients, "Ingredients")}</p>
      <p>${displayFormatedListData(
        recipe.preparation,
        "Preparation",
        true
      )}</p>      
      
      <a class="delete" data-id=${recipe._id} href="#">Delete</a>
    `;

    document.querySelector(".recipes").append(recipeEl);
  });
}

//This code worked before DateTime Picker
// function addRecipe(event) {
//   event.preventDefault();
//   //Destructuring the data we want to use
//   const { title, image, description } = event.target;

//   const recipe = {
//     title: title.value,
//     image: image.value,
//     description: description.value,
//   };

//   fetch("api/recipes", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(recipe),
//   })
//     .then((response) => response.json())
//     .then(getRecipes);
// }

//Modified to work with DateTime Picker
function addRecipe(event) {
  event.preventDefault();
  //Destructuring the data we want to use
  const { title, image, description, ingredients, preparation, createDate } =
    event.target;

  objIngredients = [];
  arrIngredients = ingredients.value.split(",");
  arrIngredients.map((item, index) => {
    objIngredients[index] = `${item}`;
  });

  objPreparation = [];
  arrSteps = preparation.value.split(",");
  arrSteps.map((item, index) => {
    var objStep = { step: `${item}` };
    objPreparation[index] = objStep;
  });

  const recipe = {
    title: title.value,
    image: image.value,
    description: description.value,
    ingredients: objIngredients,
    preparation: objPreparation,
    created: createDate.value.toString(),
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

function handleClicks(event) {
  console.log(event.target);

  //Looking for custom data attribues .... data-[attributeName]
  if (event.target.matches("[data-id]")) {
    deleteRecipe(event);
  } //else if (event.target.matches("#seed")) {
  //   seed();
  // }

  // if (event.target.id.match("bntUpload")) {
  //   console.log("Look we uploade a file????");
  //   console.log(event.target);
  //   getRecipes();
  // }

  if (event.target.id.match("btnAddData")) {
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
  if (event.target.id.match("btnDeleteData")) {
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
}

// Event Click Handlers
document.addEventListener("click", handleClicks);

// Event Form Handlers
const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addRecipe);

function updateUploadStatus(status) {
  const elem = document.querySelectorAll("span#uploadStatus");

  if (status.length == 0) {
    elem[0].innerText = ``;
  } else {
    elem[0].innerText = `Status: ${status}`;
  }
}

function uploadImage(event) {
  event.preventDefault();
  const data = new FormData(); //This is how we get the data out of the form ... (How does this work????)
  data.append("file", imageForm.file.files[0]);
  data.append("filename", imageForm.filename.value);
  fetch("/api/upload", {
    method: "POST",
    body: data,
  }).then((res) => {
    // document.getElementById("uploadStatus")  //not sure why this didn't work earlier but the one below did????
    updateUploadStatus(res.statusText);
    // elem = document.querySelectorAll("span#uploadStatus");
    // elem[0].innerText = `Status: ${res.statusText}`;
  });
}

const imageForm = document.querySelector("#imageForm");
imageForm.addEventListener("submit", uploadImage);

getRecipes();
