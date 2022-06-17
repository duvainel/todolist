const todoList = document.getElementById("todo-list");

if (localStorage.getItem("todos") === null) {
  localStorage.setItem("todos", JSON.stringify([]));
}
let todos = JSON.parse(localStorage.getItem("todos"));

function renderTodos() {
  if (!todos) return;
  todoList.innerHTML = "";
  todos.map((todo, index) => {
    todoList.innerHTML += `
    <li class="js-todo ${todo.isCompleted ? "done" : ""}" data-index=${index}>
      <span>${todo.title}</span>
      <img class="js-delete" src="./assets/delete-icon.svg" alt="delete" />
    </li>
    `;
  });
}
const taskInput = document.getElementById("task");
const createButton = document.getElementById("createButton");

function createTodo() {
  const todo = taskInput.value;
  if (!todo) {
    $("#errorToast").toast("show");
    return;
  }
  $("#successToast").toast("show");
  todos.push({ title: todo, isCompleted: false });
  todoAction();
  taskInput.value = "";
}

createButton.addEventListener("click", createTodo);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") createTodo();
});

const deleteButtons = document.getElementsByClassName("js-delete");

function deleteTodo(element) {
  const todoItem = element.parentElement;
  const todoIndex = Number(todoItem.getAttribute("data-index"));
  todos = todos.filter((todo, index) => {
    if (index !== todoIndex) return todo;
  });
  todoAction();
}

function bindDeleteEvents() {
  Array.from(deleteButtons).forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTodo(deleteButton);
    });
  });
}

const todoItems = document.getElementsByClassName("js-todo");

function toggleTodo(element) {
  if (!todos) return;
  const todoIndex = element.getAttribute("data-index");
  todos[todoIndex].isCompleted = !todos[todoIndex].isCompleted;
  todoAction();
}

function bindToggleEvents() {
  Array.from(todoItems).forEach((todoItem) => {
    todoItem.addEventListener("click", () => {
      toggleTodo(todoItem);
    });
  });
}

function todoAction() {
  renderTodos();
  bindDeleteEvents();
  bindToggleEvents();
  localStorage.setItem("todos", JSON.stringify(todos));
}

todoAction();

// function removeTodo(element) {
//   element.parentElement.remove();
// }

// function toggleTodo(element) {
//   element.classList.toggle("done");
// }

// const deleteIcons = document.getElementsByClassName("js-delete");

// Array.from(deleteIcons).forEach((deleteIcon) => {
//   deleteIcon.addEventListener("click", () => {
//     removeTodo(deleteIcon);
//   });
// });

// const todoItems = document.getElementsByClassName("js-todo");

// Array.from(todoItems).forEach((todoItem) => {
//   todoItem.addEventListener("click", () => {
//     toggleTodo(todoItem);
//   });
// });

// function createTodo() {
// if (!taskInput.value) {
//   $("#errorToast").toast("show");
//   return;
// }
//   $("#createToast").toast("show");

//   const todoItem = document.createElement("li");
//   todoItem.classList.add("js-todo");
//   todoItem.addEventListener("click", () => {
//     toggleTodo(todoItem);
//   });
//   const todoInner = document.createElement("span");
//   todoInner.innerHTML = taskInput.value;
//   const deleteIcon = document.createElement("img");
//   deleteIcon.classList.add("js-delete");
//   deleteIcon.setAttribute("src", "./icons8-trash.svg");
//   deleteIcon.setAttribute("alt", "delete");
//   deleteIcon.addEventListener("click", () => {
//     removeTodo(deleteIcon);
//   });
//   todoItem.append(todoInner, deleteIcon);

//   todoList.append(todoItem);
//   taskInput.value = "";
// }

// createButton.addEventListener("click", createTodo);
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") createTodo();
// });
