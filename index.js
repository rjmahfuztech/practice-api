const loadMeal = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => DisplayMeals(data.meals))
    // .then((data) => console.log(data.meals))
    .catch((err) => console.log(err));
};

window.onload = () => {
  loadMeal("b");
};

// Drinks Container By id
const mealsContainer = document.getElementById("meals-container");
// Search Drinks
const drinkSearch = () => {
  const mealInput = document.getElementById("meal-input").value;
  if (mealInput.length > 0) mealsContainer.innerText = "";
  if (mealInput) loadMeal(mealInput);
  document.getElementById("meal-input").value = "";
};

// Show Drinks
const DisplayMeals = (data) => {
  if (data) {
    data.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("co-12");
      div.classList.add("col-md-6");
      div.classList.add("col-lg-4");
      div.classList.add("col-xl-3");
      div.innerHTML = `
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="Image">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button onclick="handleModal('${meal.idMeal}')" class="btn btn-outline-info"
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                            >Details</button>
                        </div>
                    </div>
                </div>
            `;

      mealsContainer.appendChild(div);
    });
  } else {
    mealsContainer.innerHTML = `<h1 class="fs-2 d-flex justify-content-center align-items-center">Sorry! your Searched meal not found!!!</h1>`;
  }
};

// Modal Info
const handleModal = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => mealDetailsModal(...data.meals))
    .catch((err) => console.log(err));
};

const mealDetailsModal = (data) => {
  const modalTitle = document.getElementById("modal-title");
  const modalInfo = document.getElementById("modal-info");
  modalTitle.innerText = `Title: ${data.strMeal}`;
  modalInfo.innerHTML = `
        <img class="img-fluid" src="${data.strMealThumb}" alt="Image">
        <h5 class="mt-2">Category: ${data.strCategory}</h5>
        <h3>Ingredients:</h3>
        <li>${data.strIngredient1}</li>
        <li>${data.strIngredient2}</li>
        <li>${data.strIngredient3}</li>
        <li>${data.strIngredient4}</li>
        <li>${data.strIngredient5}</li>
        <li>${data.strIngredient6}</li>
        <p class="mt-2"><b>Instructions: </b>${data.strInstructions.slice(
          0,
          90
        )}...</p>
    `;
};
