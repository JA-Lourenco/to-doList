// DOM Selection
// Selecting the input element for manipulate insert data
const inpTask = document.getElementById("insertTask");

// Selecting the button element for click events
const addBtn = document.getElementById("addButton");

// Selecting the ul element, so we can create new items in the list
const list = document.querySelector(".pList");

// Array to receive all list items/tasks
let itemsArray = JSON.parse(localStorage.getItem("data")) || [];


// Event: Click to add your task
addBtn.addEventListener("click", createItem);

// Function to create new items in the list
function createItem (event) {
    
    const divList = document.createElement("div");
    divList.classList.add("divItems");

    const liList = document.createElement("li");
    liList.classList.add("itemsList");
    liList.innerText = inpTask.value;
    divList.appendChild(liList);

    save(inpTask.value); // Receiving the input value as parameter, then inside of her, its saving the content in Local Storage

    inpTask.value = ""; // Cleans the input local, after add a task

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("doneButton");
    doneBtn.innerText = "DONE";
    divList.appendChild(doneBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeButton");
    removeBtn.innerText = "REMOVE";
    divList.appendChild(removeBtn);

    list.appendChild(divList);
}

// Saving the input values on array, so we can save the array later on local storage
function save () {

    itemsArray.push(inpTask.value); // Receiving the input value and then 'pushing' into our array

    localStorage.setItem("data", JSON.stringify(itemsArray)); // Saving the array as string on Local Storage
}


// Function to get saved items of Local Storage
// Example: When the page refresh or close the browser
onload = function () {

    itemsArray.forEach(newLi => { // newLi -> The content of array = the input value as a task
    // For each content we create the exact same design again, after reload the page

    const divList = document.createElement("div");
    divList.classList.add("divItems");

    const liList = document.createElement("li");
    liList.classList.add("itemsList");
    liList.innerText = newLi;
    divList.appendChild(liList);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("doneButton");
    doneBtn.innerText = "DONE";
    divList.appendChild(doneBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeButton");
    removeBtn.innerText = "REMOVE";
    divList.appendChild(removeBtn);

    list.appendChild(divList);
        
    });
}


// Event: Click list -> trigger a function to remove or check tasks
list.addEventListener("click", removeNdone);

// Remove and Done: Finds out what button have been clicked and delete or mark as done
function removeNdone (event) {
    // console.log(event.target); //-> See in console which target/element is triggering the event

    const whichBtn = event.target;
    const btnParent = whichBtn.parentElement;
    
    if (whichBtn.classList[0] === "removeButton") {
        removeTask(btnParent);
        btnParent.remove();
    } 

    if (whichBtn.classList[0] === "doneButton") {
        btnParent.classList.toggle("itemsListDone");
    }
}

// Removing content of Local Storage
function removeTask (btnParent) {
    // btnParent = FATHER element of 3 elements: li, done and remove buttons
    
    arrayLS = JSON.parse(localStorage.getItem("data"));

    const indexCont = btnParent.children[0].innerText;

    arrayLS.splice(arrayLS.indexOf(indexCont), 1);

    localStorage.setItem("data", JSON.stringify(arrayLS));
}


// Selecting the clear button
delBtn = document.querySelector(".deleteAll");

// Adding the click event on the delete button, so he can delete all in Local Storage
delBtn.addEventListener("click", deleteAll);

//Function to DELETE all data in Local Storage definitely
function deleteAll () {

    localStorage.clear("data");
    alert("All tasks deleted!");
    location.reload(); // Reloads the current url
}