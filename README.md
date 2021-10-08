# Kitschy App
### *Your kitchen helper!*

Kitschy is a one-stop recipe finder and grocery list generator for all your cooking needs. It allows for recipe searching via [Edamam](https://developer.edamam.com/) API's recipe database. Once the desired recipes are added to "My Meals", a grocery list can be generated that will combine any common ingredients between the recipes into a single quantity.

## Cloud Data

Kitschy utilizes [Firebase](https://firebase.google.com/) cloud databasing to enable users to cloud save grocery lists for access by others in their households, whether accessing from desktop or mobile.

## Code Snippets
Here are a few code snippets and basic explanation of the functions they performed. The first snippet is that of our ajax api call. We used this in tandem with our user's input, searchTerm, to retrieve information for up to 20 different recipes matching the input. We then created an empty array which we pushed the results into for future use. 

```
function getRecipes(searchTerm) {
    $.ajax({
        url: 'https://api.edamam.com/api/recipes/v2?type=public' + 
            '&q=' + searchTerm +
            '&app_id=' + '2c66eee1' + 
            '&app_key=' + '102fe174b45e718bfc7022537a02504e',
        method: 'GET', 
    }).then(function (response) {
        console.log(response);
  
        if (!response.hits.length === 0) {
            popUp('No results found. Try again!');
            return;
        }

        const results = response.hits;
        let searchResults = [];
        $.each(results, function(i, result) {
            const recipeObject = generateRecipeObject(result);
            searchResults.push(recipeObject);
        });
```

Next is a bit of code relating to our cloud storage api, Firebase. Firebase was our solution to our problem of "How can we store our user's recipe information without using local storage?" While this is certainly not all you need, this bit of code was our starting point. 

```
<script type="module">
        // API configuration data, key
        const config = {
            apiKey: "AIzaSyDmqkJKGSXbAHktXA67i3HMBKonc0qyVlk",
            authDomain: "kitschy-3abde.firebaseapp.com",
            databaseURL: "https://kitschy-3abde-default-rtdb.firebaseio.com",
            projectId: "kitschy-3abde",
            storageBucket: "kitschy-3abde.appspot.com",
            messagingSenderId: "8659232932",
        }

        // Initializes Firebase
        firebase.initializeApp(config);
        const dataRef = firebase.database();
```

Next is the portion of code that is resposible for creating the recipe cards that a user will see. This code works in tandem with an event listener, not shown, that will toggle the recipe's ingredients list on or off when a recipe card is clicked. 

```
function generateRecipeCards(recipesArray, appendLocation, isMax) {
    $.each(recipesArray, function(i, recipe) {
        let addToMeals;
        let ingredientsList;
        if (!isMax) {
            addToMeals = $('<button>').attr('class', 'add-meal button').attr('data-index', i).html('<i class="fas fa-plus-square"></i> Add');
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
```

Lastly is what we dubbed the "final boss" of this coding project. The major function of this app is to create a grocery list from the various recipes a user has chosen, and add all like ingredients into one total amount. This list can be downloaded and used when at the store so that a user can be sure to get everything they will need to start cooking.

```
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
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* IDE to view/edit source code (e.g. Visual Studio Code).
* [Firebase](https://firebase.google.com/) API developer account.
* [Edamam](https://developer.edamam.com/) API key.

### Installing

1. Clone repository.
1. Substitute your Edamam and Firebase API keys and config data.
1. Open [index.html](index.html) in web browser.

### Deployment

1. Upload index.html and assets folder to webhosting site, such as GitHub.
1. If using GitHub, deploy via GitHub Pages.

---
## Deployed Link

* [See Live Site](https://starryblue7.github.io/kitschy-app/)

## Built With

* [Firebase](https://firebase.google.com/)
* [jQuery](https://jquery.com/)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [Foundation](https://get.foundation/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [GitHub](https://github.com/)

## Authors

|**Emily Dorgan** | **Vince Lee** | **Tyler Yeager** |
|-----------------|---------------|------------------|
| - [Portfolio](https://emdorgan.github.io/portfolio/)| - [Portfolio](https://starryblue7.github.io/portfolio/)| - [Portfolio](https://tylerbyeager.github.io/first-portfolio/) |
| - [Github](https://github.com/emdorgan)| - [Github](https://github.com/StarryBlue7) | - [Github](https://github.com/TylerBYeager) |
| - [LinkedIn](https://www.linkedin.com/in/emily-dorgan/)| - [LinkedIn](https://www.linkedin.com/in/vince-lee/) | - [LinkedIn](https://www.linkedin.com/in/tyler-yeager-1024/)|

## Acknowledgments

* Recipe search API from [Edamam](https://developer.edamam.com/).
* Modal plugin by Kyle Fox: [jQuery Modal](https://jquerymodal.com/).
* Custom font from [Google Fonts](https://fonts.google.com/).
* Icons provided by [FontAwesome](https://fontawesome.com/).
