# All Pseudocode

## For the search function

1. Given the user writes a term in the search input box and presses the search button.
2. Assign that search term to a variable called searchedFood
3. Make a variable called getURL, set it equal to a string which is the API call to Edamam with the searcedFood variable inserted in 
4. When the response comes in, append a header saying "showing results for: searchedFood"
5. For each search result, do the following steps
6. Make an object (named i where i is the index of the for loop) with the properties of Title (string), image (url), and the ingredients list (in the form of an array of objects)
7. and do the following steps to make a 'card':
8. Create a <div> element with an id of "recipeCard" and a data attribute of "i" (where i is the index of the for loop)
9. Create an <img> element with the placeholder src
10. Create an <img> element over the top of it, set src attribute to the image URL provided by the object
11. Create a <button> element, give it an id of "cardBtn", put the text of "+ Add" and the classes necessary to move it to the top right
12. Create an <h3> or <p> element, set text to the title provided in the 'title' property
13. Append all those elements inside the card and append the card to the page
14. There should be up to 20 element rendered to the page

## Clicking on a 'card'

1. Add an event listener to the div containing all the recipe cards, that responds to a click on any element with the id of "recipeCard"
2. When clicked, execute a function that looks at the card that was clicked, look at it's data attribute
3. Find the object with the same name as the clicked card's data attribute
4. Clear out the div containing all teh recipe cards OR make a modal (note: both approaches should work, we need to make a decision here)
4. Create an <h2> element with the name = to the title property of that object
5. If the image property is NOT empty, create an <img> element and set it's src equal to the image property
6. For each ingredient object in the ingredient list array of that object...
7. 

## For '+ Add' button



## For the 'My Meals' add/remove items



## 'Generate list' button