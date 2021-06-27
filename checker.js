
// 현재 탭의 url을 받음.
function findProbNum(mode, id, userID) {
  chrome.tabs.query(
    { active: true, lastFocusedWindow: true, currentWindow: true },
    function (tabs) {
      let url = tabs[0].url;
      let reg =/acmicpc.net\/problem/
      if(reg.test(url)) getProbNum(url, mode, id, userID);
    }
  );
}
findProbNum(true, 0, "0");
// url 말미에 적힌 문제 번호를 받음.
function getProbNum(url, mode, id, userID) {
  let i;
  for (i = url.length - 1; url[i] != "/"; i--) {}
  const probNum = url.substring(i + 1, url.length);
  document.querySelector("#problem_number").innerText = `Problem ${probNum}`;
  loadName(probNum, mode, id, userID);
}

// key가 user인 value들을 받아서 for each문을 통해 주어진 문제를 풀었는지 확인.
function loadName(probNum, mode, id, userID) {
  if (mode) {
    const currentUsers = localStorage.getItem(USER_LS);
    if (currentUsers !== null) {
      const parsedUsers = JSON.parse(currentUsers);
      parsedUsers.forEach(element => {
        checkSolved(element.id, element.text, probNum);
      });
    }
  } else {
    checkSolved(id, userID, probNum);
  }
}

// 해당 userID의 문제풀이 내역을 확인하고 성공했을 경우, id를 따라서 결과들을 저장함.
function checkSolved(id, userID, probNum) {
  const userURL = "https://www.acmicpc.net/user/" + userID;
  console.log(userURL);
  const xhr = new XMLHttpRequest();

  xhr.open("GET", userURL);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }

    if (xhr.status === 200) {
      const numberText = xhr.responseText;

      const myNum = numberText.search(new RegExp("\\b" + probNum + "\\b"));
      const checking =document.getElementById(id).querySelector(".checking");
      if (myNum !== -1) {
        checking.innerText = "Solved";
        try {
          checking.classList.remove('checking');
          checking.classList.remvoe('failed');  
        } catch (error) {
          
        }
        
        checking.classList.add('solved');
      } else {
        checking.innerText = "Yet";
        try {
          checking.classList.remove('checking');
          checking.classList.remvoe('solved');
        } catch (error) {
          
        }
        
        checking.classList.add('failed');
      }
    } else {
      // console.log(`[${xhr.status}] : ${xhr.statusText}`);
      const checking =document.getElementById(id).querySelector(".checking");
      checking.innerText = "404 User";
      try {
        checking.classList.remove('checking');
        checking.classList.remvoe('solved');
        checking.classList.remvoe('failed');  
      } catch (error) {
        
      }
    }
  };
}
