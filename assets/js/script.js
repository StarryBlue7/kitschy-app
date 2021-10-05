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
            var typeFood = response.hits[i].recipe.ingredients[j].food;

        }

       
        
        console.log(`This recipe requires ${quantity} ${typeFood}.`)

    }   

});
