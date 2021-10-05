# All Pseudocode

## For the search function

1. Given the user writes a term in the search input box and presses the search button.
2. Assign that search term to a variable called searchedFood
3. Make a variable called getURL, set it equal to a string which is the API call to Edamam with the searcedFood variable inserted in 
4. When the response comes in, append a header saying "showing results for: searchedFood"
5. For each search result,
6. Make an object (named "recipe" + i where i is the index of the for loop) with the properties of Title (string), image (url), and the ingredients list (in the form of an array of objects)
7. and do the following steps to make a 'card':
8. Create a <div> element with an id of "recipeCard" and a data attribute of "i" (where i is the index of the for loop)
9. Create an <img> element with the placeholder src
10. Create an <img> element over the top of it, set src attribute to the image URL provided by the object
11. Create a <button> element, give it an id of "cardBtn", put the text of "+ Add" and the classes necessary to move it to the top right
12. Create an <h3> or <p> element, set text to the title provided in the 'title' property

## Clicking on a 'card'



## For '+ Add' button



## For the 'My Meals' add/remove items



## 'Generate list' button