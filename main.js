let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
let clearAll = document.querySelector(".clear");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if There is tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Getting Data
getDataFromLocalStorage();

//Add Task
submit.onclick = function () {
  if (input.value != "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task from Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    // Remove Element From Page
    e.target.parentElement.remove();
  }
  //Task Element
  if (e.target.classList.contains("task")) {
    //Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);

  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(array) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";

  // Loop Over Tasks
  for (let i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", array[i].id);
    div.innerHTML = array[i].title;

    //Check IF Task Is Done
    if (array[i].completed) {
      div.className = "task done";
    }

    // create Delete Button
    let span = document.createElement("span");
    span.className = "del";

    // Append Button To Div
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);

    //Append Div To Tasks Div

    tasksDiv.appendChild(div);
  }
}

function addDataToLocalStorageFrom(array) {
  window.localStorage.setItem("tasks", JSON.stringify(array));
}

function getDataFromLocalStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(id) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(id) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == id) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

clearAll.onclick = function () {
  tasksDiv.innerHTML = "";
  localStorage.clear();
};
