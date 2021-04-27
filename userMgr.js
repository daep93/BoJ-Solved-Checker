const userList = document.querySelector("#BoJ-user-list")
const userForm = document.querySelector("#BoJ-user-form")
const userInput = document.querySelector("#BoJ-user-input");

const USER_LS = "BoJ-user-list";
let users = [];

// localStorage에 저장해놓은 이름들을 불러서 showUser함수를 통해 display한다.
function loadUserList() {
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
  if(!currentValue) return;
  showUser(currentValue);
  userInput.value = "";
  findProbNum(false, users.length, users[users.length - 1].text);
}

// 확장프로그램 실행시 checker보다 먼저 올라간다.
loadUserList();
userForm.addEventListener("submit", handleSubmit);





// showUser를 호출시에는 userObj를 만들어서 localStorage에 저장된 users에 새롭게 user를 추가한다.
function showUser(userName) {
  const li = document.createElement("li");
  const delBtn = document.createElement("i");
  const name = document.createElement('span');
  const checked = document.createElement("span");
  const newId = users.length + 1;
  delBtn.innerText = 'delete';
  delBtn.classList.add('material-icons');
  delBtn.classList.add('delete');
  name.innerText = userName;
  name.classList.add('name')
  delBtn.addEventListener("click", deleteUser);
  checked.innerText = "checking...";
  checked.classList.add('checking');
  li.appendChild(name);
  li.appendChild(checked);
  li.appendChild(delBtn);
  li.id = newId;
  userList.appendChild(li);
  const userObj = {
    text: userName,
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
