let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

let tasks = [];

addBtn.addEventListener("click", addTask);

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
  input.value = "";

  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    // Toggle complete
    span.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    // Delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    };

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = () => {
      let newText = prompt("Edit your task:", task.text);

      if (newText !== null && newText.trim() !== "") {
        task.text = newText;
        renderTasks();
      }
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    taskList.appendChild(li);
  });

    taskCount.textContent = `Total Tasks: ${tasks.length}`;
}
