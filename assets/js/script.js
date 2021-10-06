$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
  });
// Play around with edamam search api 

      







var foodSearch = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20parmesan&app_id=2c66eee1&app_key=102fe174b45e718bfc7022537a02504e";
var quantity = [];


$.ajax({
    url: foodSearch,
    method: 'GET', 
}).then(function (response) {
    
    for (var i = 0; i < 5; i++) { 
        console.log(response)
        // console.log(response.hits[i].recipe.ingredients[i].quantity);
        // console.log(response.hits[i].recipe.ingredients[i].food);
        
        
        var ingredientsList = response.hits[i].recipe.ingredients;

        for (var j = 0; j < ingredientsList.length; j++) {

            var quantity = ingredientsList[j].quantity;
            var typeFood = ingredientsList[j].food;

        }

       
        
        console.log(`This recipe requires ${quantity} ${typeFood}.`)

    }   

});
