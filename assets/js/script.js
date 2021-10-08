// Search by search term in input
$('.menu').on('submit', function(event) {
    event.preventDefault();
    const searchTerm = $(this).children('input').val();
    if (!searchTerm) {
        popUp('No search term. Try again!');
        return;
    }
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
  
        if (!response.hits.length === 0) {
            popUp('No results found. Try again!');
            return;
        }

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

// Modal pop-up
function popUp(message) {
    $('#recipe-modal').empty();
    $('#recipe-modal').modal().text(message);
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
    let index = $(this).attr('data-index');
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

// Event listener for recipe modal from my meals
$('#my-meals').on("click", '.selected-meals', function(event){
    event.stopPropagation();
    popUp();
    let index =parseInt($(this).attr('data-index'));
    console.log(typeof(index));
    let allMeals = getMyMeals();
    let singleMeal = allMeals.slice(index, index+1);
    console.log(singleMeal);
    generateRecipeCards(singleMeal, $("#recipe-modal"), true);
});

// Event listener to generate grocery list
$('#grocery-list').on('click', function(event){
    event.stopPropagation();
    let myMeals = getMyMeals();
    if (!myMeals || myMeals.length === 0) {
        popUp('No recipes chosen. Add something tasty!');
        return;
    }
    makeGroceryList(myMeals);
})

// Event listener for the copy button on the grocery list
// $('#search-results').on('click', '#copy-btn', function(event){
//     event.stopPropagation();
//     document.getElementById('compiled-grocery-list').select();
//     document.getElementById('compiled-grocery-list').setSelectionRange(0, 100000);
//     $('#copy-btn').html('Copied! <i class="fas fa-clipboard-check"></i>')
// })

// Get my meals from local storage
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
    localStorage.setItem("myMeals", JSON.stringify(myMeals));
    makeMyMeals();
};

// Generate the my meals list 
function makeMyMeals(){
    $("#my-meals").html('');
    let myMeals = getMyMeals();
    for(let i = 0; i<myMeals.length; i++){
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
    const listItems = Object.keys(groceryList);
    $('#search-results').empty();
    $('#search-results').append($('<h2>').html(`Your Grocery List: 
        <button class = "button custom-copy" id="upload">
            Upload <i class="fas fa-cloud-upload-alt"></i>
        </button>`).addClass('grocery-title'));
    let compiledList = $('<ul>').attr('id', 'compiled-grocery-list');
    $('#search-results').append(compiledList);
    for(let i = 0; i<listItems.length; i++){
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

// Run on page load
function init() {
    makeMyMeals();
};

init();