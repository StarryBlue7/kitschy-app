$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
  });
// Play around with edamam search api 


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVR1qX2b32YafFZ9VcHYOYS6XCF2CMQwc",
    authDomain: "kitschy-app.firebaseapp.com",
    projectId: "kitschy-app",
    storageBucket: "kitschy-app.appspot.com",
    messagingSenderId: "700644418613",
    appId: "1:700644418613:web:d5e8843c2e1aa49b6b7d7c",
    measurementId: "G-C5JM1SY5YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
      






getRecipes("chicken parmesan");
// var foodSearch = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20parmesan&app_id=2c66eee1&app_key=102fe174b45e718bfc7022537a02504e";
// var quantity = [];

function getRecipes(searchTerm) {
    $.ajax({
        url: 'https://api.edamam.com/api/recipes/v2?type=public' + 
            '&q=' + searchTerm +
            '&app_id=' + '2c66eee1' + 
            '&app_key=' + '102fe174b45e718bfc7022537a02504e',
        method: 'GET', 
    }).then(function (response) {
    
    // for (var i = 0; i < 5; i++) { 
    //     console.log(response)
    //     // console.log(response.hits[i].recipe.ingredients[i].quantity);
    //     // console.log(response.hits[i].recipe.ingredients[i].food);
        
    //     var ingredientsList = response.hits[i].recipe.ingredients;

    //     for (var j = 0; j < ingredientsList.length; j++) {
    //         var quantity = ingredientsList[j].quantity;
    //         var typeFood = response.hits[i].recipe.ingredients[j].food;
    //     }
    //     console.log(`This recipe requires ${quantity} ${typeFood}.`)
    // }   
        let searchResults = [];
        $.each(response, function(i, recipe) {
            const recipeObject = generateRecipeObject(recipe);
            searchResults.push(recipeObject);
        });
        
        localStorage.setItem("searchResults", searchResults);
        
        generateRecipeCards(searchResults, $('#search-results'));
    });
}

// Generate recipe object
function generateRecipeObject(recipe) {
    const recipeObject = {
        label: recipe.label,
        image: recipe.image,
        ingredients: parseIngredients(recipe.ingredients)
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
            weight: ingredient.weight,
            text: ingredient.text
        }
        ingredientsArray.push(ingredientObject);
    });
    return ingredientsArray;
}

// Generate recipe cards from recipes array
function generateRecipeCards(recipesArray, appendLocation) {
    $.each(recipesArray, function(i, recipe) {
        const cardHeader = $('<h3>').text(recipe.label);
        const cardPhoto = $('<img>').attr('src', recipe.image).attr('alt', recipe.label);
        const ingredientsList = $('<ul>').attr('class', 'ingredient-list');
    
        $.each(recipe.ingredients, function(i, ingredient) {
            const ingredientItem = $('<li>').text(ingredient.weight + 'g ' + ingredient.food);
            ingredientsList.append(ingredientItem);
        });
    
        let card = $('<div>').attr('data-index', recipe).attr('class', 'recipeCard');
        card.append(cardPhoto, cardHeader, ingredientsList);
        appendLocation.append(card);
    })
}