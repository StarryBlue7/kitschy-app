// Play around with edamam search api 


// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//     apiKey: "AIzaSyAVR1qX2b32YafFZ9VcHYOYS6XCF2CMQwc",
//     authDomain: "kitschy-app.firebaseapp.com",
//     projectId: "kitschy-app",
//     storageBucket: "kitschy-app.appspot.com",
//     messagingSenderId: "700644418613",
//     appId: "1:700644418613:web:d5e8843c2e1aa49b6b7d7c",
//     measurementId: "G-C5JM1SY5YH"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
      
// Search by search term in input
$('.menu').on('submit', function(event) {
    event.preventDefault();
    const searchTerm = $(this).children('input').val();
    getRecipes(searchTerm);
});

function getRecipes(searchTerm) {
    $.ajax({
        url: 'https://api.edamam.com/api/recipes/v2?type=public' + 
            '&q=' + searchTerm +
            '&app_id=' + '2c66eee1' + 
            '&app_key=' + '102fe174b45e718bfc7022537a02504e',
        method: 'GET', 
    }).then(function (response) {

        console.log(response)
  
        const results = response.hits
        let searchResults = [];
        $.each(results, function(i, result) {
            const recipeObject = generateRecipeObject(result);
            searchResults.push(recipeObject);
        });
        
        // Save search results to local storage
        localStorage.setItem("searchResults", JSON.stringify(searchResults));
        console.log(searchResults);
        
        // Populate search results section of page
        const resultsHeader = $('<h2>').text('Showing results for: ' + searchTerm);
        $('#search-results').html('');
        $('#search-results').append(resultsHeader);
        generateRecipeCards(searchResults, $('#search-results'), false);
    });
}

// Generate recipe object
function generateRecipeObject(result) {
    const recipeObject = {
        label: result.recipe.label,
        image: result.recipe.image,
        yield: result.recipe.yield,
        ingredients: parseIngredients(result.recipe.ingredients),
        url: result.recipe.url
    }
    return recipeObject;
}

// Create array of ingredient objects
function parseIngredients(ingredients) {
    let ingredientsArray = [];
    $.each(ingredients, function(i, ingredient) {
        const ingredientObject = {
            food: ingredient.food,
            quantity: ingredient.quantity,
            measure: ingredient.measure,
            weight: ingredient.weight,
            text: ingredient.text
        }
        ingredientsArray.push(ingredientObject);
    });
    return ingredientsArray;
}

// Generate recipe cards from recipes array
function generateRecipeCards(recipesArray, appendLocation, isMax) {
    $.each(recipesArray, function(i, recipe) {
        let addToMeals;
        let ingredientsList;
        if (!isMax) {
            addToMeals = $('<button>').attr('class', 'add-meal success button').attr('data-index', i).html('<i class="fas fa-plus-square"></i>Add');
            ingredientsList = $('<ul>').attr('class', 'ingredient-list hidden');
        } else {
            addToMeals = $('<em>');
            ingredientsList = $('<ul>').attr('class', 'ingredient-list');
        }
        
        const cardHeader = $('<h3>').text(recipe.label);
        const cardPhoto = $('<img>').attr('src', recipe.image).attr('alt', recipe.label);
        const yield = $('<p>').text('(Yields ' + recipe.yield + ' servings)');
        
        const fullLink = $('<a>').attr('href', recipe.url).attr('target', '_blank').html('See Instructions <i class="fas fa-external-link-alt"></i>');
    
        $.each(recipe.ingredients, function(i, ingredient) {
            const ingredientItem = $('<li>').text(ingredient.text);
            ingredientsList.append(ingredientItem);
        });
    
        let card = $('<div>').attr('data-index', i).attr('class', 'recipe-card');
        card.append(addToMeals, cardPhoto, cardHeader, yield, ingredientsList, fullLink);
        appendLocation.append(card);
    });
}

// Event listener for cards to show/hide ingredient lists
$('#search-results').on('click', '.recipe-card', function(event) {
    event.stopPropagation();
    $(this).children('ul').toggleClass('hidden');
    $(this).siblings().children('ul').addClass('hidden');
    $(this).toggleClass('card-clicked');
    $(this).siblings().removeClass('card-clicked');
});

// Event listener to add meals to my meals
$('#search-results').on('click', '.add-meal', function(event) {
    event.stopPropagation();
    let index = $(this).attr('data-index');         //This shouldn't work with strings of number instead of number but... it... does?
    addMeal(index);
});

// Event listener for delete buttons

$('#my-meals').on('click', '.delBtn', function(event){
    event.stopPropagation();
    let index = $(this).attr('data-index');
    let myMeals = getMyMeals();
    myMeals.splice(index, 1);
    localStorage.setItem("myMeals", JSON.stringify(myMeals));
    makeMyMeals();
})

// Event listener modal
$('#my-meals').on("click", '.selected-meals', function(event){
    event.stopPropagation();
    $('#recipe-modal').empty();
    $('#recipe-modal').modal();
    let index =parseInt($(this).attr('data-index'));
    console.log(typeof(index));
    let allMeals = getMyMeals();
    let singleMeal = allMeals.slice(index, index+1);
    console.log(singleMeal);
    generateRecipeCards(singleMeal, $("#recipe-modal"), true);
});


// Event listener for the generate grocery list

$('#grocery-list').on('click', function(event){
    event.stopPropagation();
    let myMeals = getMyMeals();
    console.log(myMeals);
    makeGroceryList(myMeals);
})

// Event listener for the copy button on the grocery list

// $('#search-results').on('click', '#copy-btn', function(event){
//     event.stopPropagation();
//     document.getElementById('compiled-grocery-list').select();
//     document.getElementById('compiled-grocery-list').setSelectionRange(0, 100000);
//     $('#copy-btn').html('Copied! <i class="fas fa-clipboard-check"></i>')
// })

// grabs my meals from local storage as an array of objects

function getMyMeals(){
    let myMeals = JSON.parse(localStorage.getItem("myMeals"));
    if(!myMeals){
        myMeals = [];
    }
    return myMeals;
}

// Add meals to my meals
function addMeal(index) {
    let searchResults = JSON.parse(localStorage.getItem("searchResults"));
    let myMeals = getMyMeals();
    myMeals.push(searchResults[index]);
    // generateRecipeCards(myMeals, $('#my-meals'));
    localStorage.setItem("myMeals", JSON.stringify(myMeals));
    makeMyMeals();
};
// generates the my meals list 
function makeMyMeals(){
    $("#my-meals").html('');
    let myMeals = getMyMeals();
    for(let i = 0; i<myMeals.length; i++){ //we left off at trying to set data index 
        let newEntry = $('<div>');
        newEntry.attr('class', 'selected-meals').attr('data-index', i); 
        newEntry.html(`<button 
                        class='button alert delBtn' 
                        data-index='${i}'>
                        <i class='fas fa-trash'></i>
                        </button> 
                        ${myMeals[i].label}`); 
        
        $('#my-meals').append(newEntry);
    }
}

// Combine ingredients from all selected meals into object object
function makeGroceryList(recipeList) {
    let groceryList= {};

    $.each(recipeList, function(i, recipe) {
        $.each(recipe.ingredients, function(i, ingredient) {
            if (groceryList[ingredient.food]) {
                groceryList[ingredient.food].weight += ingredient.weight; 
            } else {
                groceryList[ingredient.food] = {
                    weight: ingredient.weight,
                    weightConvert: ingredient.weight,
                    quantity: ingredient.quantity,
                    measure: ingredient.measure
                }
            }
        });
    })
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    displayGroceryList(groceryList);
}

function displayGroceryList(groceryList) {
    console.log(groceryList);
    const listItems = Object.keys(groceryList);
    console.log(listItems);
    $('#search-results').empty();
    $('#search-results').append($('<h2>').html(`Your Grocery List: 
                                            <div>
                                                <button class="button custom-copy" id="copy-btn">
                                                Copy list <i class="fas fa-clipboard-list"></i>
                                                </button>
                                                <button class = "button custom-copy" id="upload">
                                                Upload <i class="fas fa-cloud-upload-alt"></i>
                                                </button>
                                            </div>`).addClass('grocery-title'));
    let compiledList = $('<ul>').attr('id', 'compiled-grocery-list');
    $('#search-results').append(compiledList);
    for(let i = 0; i<listItems.length; i++){
        console.log(groceryList[listItems[i]])
        let measure = groceryList[listItems[i]].measure
        let calcQuantity = Math.ceil(groceryList[listItems[i]].quantity * (groceryList[listItems[i]].weight / groceryList[listItems[i]].weightConvert));
        if(isNaN(calcQuantity) || calcQuantity === 0){
            calcQuantity = "";
        }
        if(measure === null){
            measure = "";
        }
        let groceryItem = $('<li>').html(calcQuantity + " " + measure + " " + listItems[i])
        compiledList.append(groceryItem);
    }
}

// Generates modal
// function addModal() {
//     let newModal = $('<div>');
//     newModal.addClass('modal');
//     newModal.attr('id', 'recipe-modal') 
//     newModal.html(`<h1>This is a test</h1>`);
//     $('#my-meals').append(newModal);
// }

// Run on page load
function init() {
    makeMyMeals();
};

init();