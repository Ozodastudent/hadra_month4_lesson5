let formEl = document.querySelector(".js-form");
let inputEl = document.querySelector(".js-input");
let listEl = document.querySelector(".js-list");
let allBtnEl = document.querySelector(".allcount_btn");
let completeBtnEl = document.querySelector(".complete_btn");
let uncompleteBtnEl = document.querySelector(".uncomplete_btn");

// let btnElThree = document.querySelector(".js-btn");

let todos = [];
let renderTodo = (array, node) => {
  node.innerHTML = "";
  array.forEach((element) => {
    allBtnEl.textContent = array.length;
    completeBtnEl.textContent = array.filter(
      (element) => element.isComplete == true
    ).length;
    uncompleteBtnEl.textContent = array.filter(
      (element) => element.isComplete == false
    ).length;
    let newItem = document.createElement("li");
    let newSpan = document.createElement("span");
    let newButton = document.createElement("button");
    let newCheckbox = document.createElement("input");
    newItem.setAttribute("class", "js-newitem");
    newSpan.textContent = element.name;
    newSpan.setAttribute("class", "js-span");
    newButton.textContent = "Delete";
    newButton.setAttribute("class", "delete-btn");
    newButton.dataset.todoId = element.id;
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("class", "todo-check");
    newCheckbox.dataset.todoId = element.id;
    if (element.isComplete) {
      newSpan.style.textDecoration = "line-through";
      newCheckbox.checked = true;
    }
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newSpan);
    newItem.appendChild(newButton);
    node.appendChild(newItem);
  });
};

listEl.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn")) {
    let deletedId = evt.target.dataset.todoId;
    listEl.innerHTML = "";
    let findedIndex = todos.findIndex((todo) => todo.id == deletedId);
    todos.splice(findedIndex, 1);
    renderTodo(todos, listEl);
  } else if (evt.target.matches(".todo-check")) {
    let checkedId = evt.target.dataset.todoId;
    listEl.innerHTML = "";

    let findedElement = todos.find((todo) => todo.id == checkedId);

    findedElement.isComplete = !findedElement.isComplete;
    renderTodo(todos, listEl);
  }
});
formEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
  listEl.innerHTML = "";
  let inputValueEl = inputEl.value.trim();

  let obj = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    name: inputValueEl,
    isComplete: false,
  };

  todos.push(obj);
  renderTodo(todos, listEl);
  inputEl.value = "";
});
