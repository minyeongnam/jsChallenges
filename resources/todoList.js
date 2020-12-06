
const addForm = document.querySelector(".add-form");
const addInput = addForm.querySelector("input");
const pendingList = document.querySelector(".list-pending");
const finishedList = document.querySelector(".list-finished");
const TODOS_LS = "toDos";
const FIN_LS = "finItems";
let toDos = [];
let finItems = [];
let newId = 0;

function changeGoBack(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const btnDel = li.querySelector(".btn-del");
  pendingList.appendChild(li);
  btn.innerHTML = "✅";
  btn.removeEventListener("click", changeGoBack);
  btn.addEventListener("click", changeListFin);
  btnDel.removeEventListener("click", delFinItem);
  btnDel.addEventListener("click", delTodo);

  const addToDos = finItems.find((item) => {
    return item.id === parseInt(li.id, 10);
  });

  toDos.push(addToDos);
  saveToDos();

  const cleanFin = finItems.filter((item) => {
    return item.id !== parseInt(li.id, 10);
  });

  finItems = cleanFin;
  saveFinItems();
}
function delFinItem(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);

  const cleanFinItems = finItems.filter((el) => {
    return el.id !== parseInt(li.id, 10);
  });

  finItems = cleanFinItems;
  saveFinItems();
}

function changeListFin(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const btnDel = li.querySelector(".btn-del");
  finishedList.appendChild(li);
  btn.innerHTML = "⏪";
  btn.removeEventListener("click", changeListFin);
  btn.addEventListener("click", changeGoBack);
  btnDel.removeEventListener("click", delTodo);
  btnDel.addEventListener("click", delFinItem);

  const addFins = toDos.find((todo) => {
    return todo.id === parseInt(li.id, 10);
  });
  finItems.push(addFins);
  saveFinItems();

  const cleanToDos = toDos.filter((todo) => {
    return todo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}

function delTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);

  const cleanToDos = toDos.filter((todo) => {
    return todo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveFinItems() {
  localStorage.setItem(FIN_LS, JSON.stringify(finItems));
}

function toDoItem(value) {
  newId = newId + 1;
  const li = document.createElement("li");
  li.id = newId;
  const btnDel = document.createElement("button");
  btnDel.innerHTML = "❌";
  btnDel.classList.add("btn-del");
  btnDel.addEventListener("click", delTodo);
  const btnFin = document.createElement("button");
  btnFin.innerHTML = "✅";
  btnFin.addEventListener("click", changeListFin);
  const span = document.createElement("span");
  span.innerHTML = value;
  li.appendChild(span);
  li.appendChild(btnDel);
  li.appendChild(btnFin);
  pendingList.appendChild(li);

  const toDoObj = {
    text: value,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function finItem(value) {
  newId = newId + 1;
  const li = document.createElement("li");
  li.id = newId;
  const btnDel = document.createElement("button");
  btnDel.innerHTML = "❌";
  btnDel.classList.add("btn-del");
  btnDel.addEventListener("click", delFinItem);
  const btnFin = document.createElement("button");
  btnFin.innerHTML = "⏪";
  btnFin.addEventListener("click", changeGoBack);
  const span = document.createElement("span");
  span.innerHTML = value;
  li.appendChild(span);
  li.appendChild(btnDel);
  li.appendChild(btnFin);
  finishedList.appendChild(li);

  const toDoObj = {
    text: value,
    id: newId
  };
  finItems.push(toDoObj);
  saveFinItems();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = addInput.value;
  toDoItem(currentValue);
  addInput.value = "";
}

function loadIList() {
  const toDoList = localStorage.getItem(TODOS_LS);
  const finList = localStorage.getItem(FIN_LS);
  if (toDoList !== null) {
    const parseToDos = JSON.parse(toDoList);
    parseToDos.forEach((toDo) => {
      toDoItem(toDo.text);
    });
  }
  if (finList !== null) {
    const parseFinList = JSON.parse(finList);
    parseFinList.forEach((toDo) => {
      finItem(toDo.text);
    });
  }
}

