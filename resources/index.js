
const nameBox = document.querySelector(".namebox");
const todolist = document.querySelector(".todolist");

function userName(event) {
  event.preventDefault();
  const idInput = document.getElementById("id");
  const idValue = idInput.value;
  if(idValue !== null){
    localStorage.setItem("name", idValue);
  }
  loadName();
}

function loadName() {
  const heading = document.querySelector("h1");
  const name = localStorage.getItem("name");
  
  if(name !== null){
    heading.innerHTML = "hello! " + name;
    nameBox.style.display="none";
    todolist.style.display="block";
    loadIList();
    addForm.addEventListener("submit", handleSubmit);
  }
}

function init() {
  nameBox.addEventListener("submit", userName);
  loadName();
}
init();


