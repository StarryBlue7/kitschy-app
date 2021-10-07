const config = {
    apiKey: "AIzaSyDmqkJKGSXbAHktXA67i3HMBKonc0qyVlk",
    authDomain: "kitschy-3abde.firebaseapp.com",
    databaseURL: "https://kitschy-3abde-default-rtdb.firebaseio.com",
    projectId: "kitschy-3abde",
    storageBucket: "kitschy-3abde.appspot.com",
    messagingSenderId: "8659232932",
};

firebase.initializeApp(config);

const db = firebase.database();

// $("#add-user").on("click", function(event) {
//     event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    // name = $("#name-input").val().trim();
    // email = $("#email-input").val().trim();
    // age = $("#age-input").val().trim();
    // comment = $("#comment-input").val().trim();

    // Code for the push
//     dataRef.ref().push({

//       name: name,
//       email: email,
//       age: age,
//       comment: comment,
//       dateAdded: firebase.database.ServerValue.TIMESTAMP
//     });
// });

// Save grocery list changes to cloud
function cloudGroceryList(userId, groceryList) {
    set(db.ref('users/' + userId), {
        groceryList: groceryList,
    });
}

// Retrieve real-time changes to grocery list
const groceryListRef = db.ref('users/' + userId + '/groceryList');
onValue(groceryListRef, (snapshot) => {
    const groceryList = snapshot.val();
    updateGroceryList(groceryList);
});
