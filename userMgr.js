const userList = document.querySelector(".BoJ-user-list"),
  userForm = document.querySelector(".BoJ-user-form"),
  userInput = userForm.querySelector("input");

const USER_LS = "user";
let users = [];

function saveUsers() {
  localStorage.setItem(USER_LS, JSON.stringify(users));
}

function deleteUser(event) {
  const btn = event.target;
  const li = btn.parentNode;
  userList.removeChild(li);
  const cleanUsers = users.filter((element) => {
    return element.id !== Number(li.id);
  });
  toDos = cleanUsers;
  saveUsers();
}

function showUser(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = users.length + 1;
  delBtn.innerText = text;
  delBtn.addEventListener("click", deleteUser);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  userList.appendChild(li);
  const userObj = {
    text: text,
    id: newId,
  };
  users.push(userObj);
  saveUsers();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = userInput.value;
  showUser(currentValue);
  userInput.value = "";
}

function loadName() {
  const currentUsers = localStorage.getItem(USER_LS);
  if (currentUsers !== null) {
    const parsedUsers = JSON.parse(currentUsers);
    parsedUsers.forEach((element) => {
      showUser(element.text);
    });
  }
}

function init() {
  loadName();
  userForm.addEventListener("submit", handleSubmit);
}
init();
