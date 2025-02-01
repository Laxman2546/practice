const input = document.querySelector(".todoInput");
const addBtn = document.querySelector(".add");

window.addEventListener("load", () => {
  loadtodos();
});

addBtn.addEventListener("click", () => {
  let inputValue = input.value.trim();
  if (inputValue) {
    todoList(inputValue);
    input.value = ""; // Clear input after adding
  }
});

const todoList = (inputValue) => {
  const todosContainer = document.querySelector(".todos");
  const tododiv = document.createElement("div");
  tododiv.className = "todo1";

  const uniqueId = `todo-${Date.now()}`; // Generate ID once

  const label = document.createElement("label");
  label.htmlFor = uniqueId;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = uniqueId;

  const span = document.createElement("span");
  span.innerText = inputValue;

  label.appendChild(checkbox);
  label.appendChild(span);
  tododiv.appendChild(label);
  todosContainer.appendChild(tododiv); // Append tododiv instead of label

  savetodos({ id: uniqueId, text: inputValue }); // Save with ID
};

const savetodos = (todo) => {
  let todoarray = JSON.parse(localStorage.getItem("todos")) || [];
  todoarray.push(todo);
  localStorage.setItem("todos", JSON.stringify(todoarray));
};

const loadtodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  if (todos.length === 0) {
    console.log("No todos found. Add something!");
    return;
  }

  const todosContainer = document.querySelector(".todos");
  todosContainer.innerHTML = ""; 

  todos.forEach((todo) => {
    const tododiv = document.createElement("div");
    tododiv.className = "todo1";

    const label = document.createElement("label");
    label.htmlFor = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todo.id;

    const span = document.createElement("span");
    span.innerText = todo.text;

    label.appendChild(checkbox);
    label.appendChild(span);
    tododiv.appendChild(label);
    todosContainer.appendChild(tododiv);
  });
};
