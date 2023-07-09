const leadMeal = (searchMeal) => {
    const API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`
    fetch(API)
        .then(res => res.json())
        .then(data => displayMealData(data.meals))
}

const displayMealData = (meals) => {

    const foodContainer = document.getElementById('food-container')
    foodContainer.innerHTML = ''
    for (const meal of meals) {
        const mealDiv = document.createElement('div')
        mealDiv.classList.add('col')
        mealDiv.innerHTML =
            `
        <div class="card " style="height: 270px;">
            <div class="row">
                <div class="col-md-5">
                    <img src="${meal.strMealThumb}" style="height: 270px;" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-7 d-flex align-items-center">
                    <div class="card-body">
                        <h5 class="card-title fw-bold"> ${meal.strMeal} </h5>
                        <p class="card-text" style="color: grey;" >There are many variations of passages of available, but the majority have suffered</p>
                        <button onclick="loadMealDetails('${meal.idMeal}')" type="button" data-bs-toggle="modal" data-bs-target="#mealDetails"  class="border-0 btn btn-warning">view details</button>
                    </div>
                </div>
            </div>
        </div>
        `
        foodContainer.appendChild(mealDiv)
    }
}

const searchMeal = () => {
    const searchBtn = document.getElementById('searchBtn')
    searchBtn.addEventListener('click', () => {
        const inputValue = document.getElementById('searchInput').value;
        leadMeal(inputValue)
        document.getElementById('searchInput').value = ''
    })
}


const loadMealDetails = (idMeal) => {
    const API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(API)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))

    const displayMealDetails = (meal) => {
        document.getElementById('mealDetailsLabel').innerText = meal.strMeal
        document.getElementById('mealDetailsImg').innerHTML =
            `
        <div>
            <img src="${meal.strMealThumb}" style="height: 270px;" class="card-img rounded-start mb-3" alt="...">
            <div class="mb-3">
                <span class="fw-bold me-2">Category : </span><span> ${meal.strCategory} </span> 
            </div>
            <div class="mb-3">
                <span class="fw-bold mb-3 me-2">Area : </span><span> ${meal.strArea} </span> 
            </div>
            <div class="mb-3">
                <span class="fw-bold mb-3 me-2">Area : </span><span> ${meal.strInstructions} </span> 
            </div>
            <div class="mb-3">
                <span class="fw-bold mb-3 me-2">Youtube : </span><a href= "">${meal.strYoutube}</a> 
            </div>
        </div>
        `
    }
}
searchMeal()
leadMeal('meat')
