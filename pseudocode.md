# All Pseudocode

## For the search function

1. Given the user writes a term in the search input box and presses the search button.
2. Assign that search term to a variable called searchedFood
3. Make a variable called getURL, set it equal to a string which is the API call to Edamam with the searcedFood variable inserted in 
4. When the response comes in, append a header saying "showing results for: searchedFood"
5. For each search result, do the following steps
6. Make an recipe object (named i where i is the index of the for loop) with the following properties:
    - Title (string), 
    - image (url),
    - ingredients list (in the form of an array of objects)
    - ingredientLines array (array of strings, where each string is a specific ingredient with it's quantity in plain english)
    - URL to the recipe page (which shows the step-by-step)
7. and do the following steps to make a 'card':
8. Create a <div> element with an id of "recipeCard" and a data attribute of "i" (where i is the index of the for loop)
9. Create an <img> element with the placeholder src
10. Create an <img> element over the top of it, set src attribute to the image URL provided by the recipe object
11. Create a <button> element, give it an id of "addBtn", put the text of "+ Add", a data attribute of 'i' and the classes necessary to move it to the top right
12. Create an <h3> or <p> element, set text to the title provided in the 'title' property
13. Append all those elements inside the card and append the card to the page
14. There should be up to 20 element rendered to the page

## Clicking on a 'card'

1. Add an event listener to the div containing all the recipe cards, that responds to a click on any element with the id of "recipeCard"
2. When clicked, execute a function that looks at the card that was clicked, look at it's data attribute
3. Find the recipe object with the same name as the clicked card's data attribute
4. Clear out the div containing all the recipe cards OR make a modal pop up (note: both approaches should work, we need to make a decision here)
5. Create an <h2> element with the name = to the title property of that recipe object
6. Create a <button> element, give it an id of "cardBtn", put the text of "+ Add" and the classes necessary to move it to the top right
7. If the image property is NOT empty, create an <img> element and set it's src equal to the image property
8. Look at the recipe object's ingredientLines property (an array of strings).
9. For each item in the ingredientLines array, make a <p> tag and fill text with the string at each index
10. Make an <a> element that looks like a button, set its href to the recipe object's url and set it's text to "See Full recipe instructions"

## For '+ Add' button

1. Add an event listener to the div containing all the recipe cards, that responds to a click on any element with the id of "addBtn"
2. When clicked, execute a function that looks at the +Add button that was clicked, look at it's data attribute
3. Find the recipe object with the same name as the addBtn's attribute
4. Create a new <div> and set the text content to the title property in the recipe object
5. Store the recipe object in local storage with a key equal to the title property in the recipe object

## 'Generate list' button

1. Make an empty object that will be the grocery list
2. When the generate list button is clicked
3. Get all of the recipe objects for each div in My Meals
4. For each recipe ingredient, look to see if a duplicate already exists in the grocery list object
5. If no, then jsut add it to the object grocery list
6. If yes, add the quantity properties together
7. When all lists are added, return a full grocery list to the user