let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

let clearAllBtn = document.getElementById("clearAllBtn");

let currentFilter = "all";

//Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);

clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")){
tasks = [];
localStorage.setItem("tasks",JSON.stringify(tasks));
renderTasks();
  }
});

// Add with Enter key
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  let text = input.value.trim();
  if (text === "") return;

  let task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);

  //Save
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {

    if (currentFilter === "completed" && !task.completed) return;
    if (currentFilter === "pending" && task.completed) return;

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    // Toggle complete
    span.onclick = () => {
      task.completed = !task.completed;

      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = () => {
      let newText = prompt("Edit your task:", task.text);
      if (newText !== null ) {
        task.text = newText;

        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      }
    };

    // Delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);

      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });

    taskCount.textContent = `Tasks: ${tasks.length}`;
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

//Initial load
renderTasks();
