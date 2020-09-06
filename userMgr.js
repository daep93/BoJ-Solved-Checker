const userList = document.querySelector(".BoJ-user-list"),
  userForm = document.querySelector(".BoJ-user-form"),
  userInput = userForm.querySelector("input");

const USER_LS = "user";
let users = [];

// 확장프로그램 실행시 checker보다 먼저 올라간다.
init();
function init() {
  loadName();
  userForm.addEventListener("submit", handleSubmit);
}

// localStorage에 저장해놓은 이름들을 불러서 showUser함수를 통해 display한다.
function loadName() {
  const currentUsers = localStorage.getItem(USER_LS);
  if (currentUsers !== null) {
    const parsedUsers = JSON.parse(currentUsers);
    parsedUsers.forEach((element) => {
      showUser(element.text);
    });
  }
}

// userID를 입력하고 submit을 한 경우, showUser로 넘어간다.
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = userInput.value;
  showUser(currentValue);
  userInput.value = "";
  findProbNum(false, users.length, users[users.length - 1].text);
}

// showUser를 호출시에는 userObj를 만들어서 localStorage에 저장된 users에 새롭게 user를 추가한다.
function showUser(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = users.length + 1;
  delBtn.innerText = text;
  delBtn.addEventListener("click", deleteUser);
  span.innerText = "checking";
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

function deleteUser(event) {
  const btn = event.target;
  const li = btn.parentNode;
  userList.removeChild(li);
  const cleanUsers = users.filter((element) => {
    return element.id !== Number(li.id);
  });
  users = cleanUsers;
  saveUsers();
}

function saveUsers() {
  localStorage.setItem(USER_LS, JSON.stringify(users));
}
