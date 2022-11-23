let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

function handleChecked(index) {
  const currentTodo = todos[index];
  todos[index] = {
    text: currentTodo.text,
    isDone: !currentTodo.isDone,
  };
  renderToDos();
}

function removeTodo(index) {
  todos.splice(index, 1);

  renderToDos();
}

function todoItem(item, index) {
  const li = document.createElement("li");
  li.innerHTML = ` <div>
    <input type="checkbox" onChange="handleChecked(${index})" ${
    item.isDone && "checked"
  }>
    ${item.isDone ? `<s>${item.text}</s>` : item.text}
    </div>
    <a href="#" onClick="removeTodo(${index})">
        <i class="bi bi-x"></i>
    </a>`;
  return li;
}

function renderToDos() {
  if (todos.length) {
    const ul = document.createElement("ul");
    ul.className = "todo-item";
    todos.forEach((item, index) => {
      ul.append(todoItem(item, index));
    });
    document.querySelector(".todos").innerHTML = ul.outerHTML;
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.elements.todoText.value) {
    todos.unshift({
      text: e.target.elements.todoText.value,
      isDone: false,
    });
    renderToDos();
    e.target.elements.todoText.value = "";
  } else {
    alert("Pleaze add your task!");
  }
});

renderToDos();
