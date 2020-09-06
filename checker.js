function checkSolved(id, userID, probNum) {
  const userURL = "https://www.acmicpc.net/user/" + userID;
  console.log(userURL);
  const xhr = new XMLHttpRequest();
  // 비동기 방식으로 Request를 오픈한다
  xhr.open("GET", userURL);
  // Request를 전송한다
  xhr.send();

  // Event Handler
  xhr.onreadystatechange = function () {
    // 서버 응답 완료 && 정상 응답
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      console.log("readyState!==XMLHttpReq");
      return;
    }

    if (xhr.status === 200) {
      // console.log("success: " + xhr.responseType);
      const numberText = xhr.responseText;
      console.log(probNum);
      console.log(typeof probNum);

      // const myNum = numberText.match(new RegExp("\\b" + probNum + "\\b", "gi")).length;
      const myNum = numberText.search(new RegExp("\\b" + probNum + "\\b"));
      console.log("myNum: " + myNum);
      if (myNum !== -1) {
        document.getElementById(id).querySelector("span").innerText = "solved";
      } else {
        document.getElementById(id).querySelector("span").innerText = "yet";
      }
    } else {
      console.log("fail");
      console.log(`[${xhr.status}] : ${xhr.statusText}`);
    }
  };
}

function loadName(probNum) {
  const currentUsers = localStorage.getItem("user");
  console.log(currentUsers);
  if (currentUsers !== null) {
    const parsedUsers = JSON.parse(currentUsers);
    parsedUsers.forEach((element) => {
      console.log(element.text);
      checkSolved(element.id, element.text, probNum);
    });
  }
}

function getProbNum(url) {
  let i;
  for (i = url.length - 1; url[i] != "/"; i--) {}
  const probNum = url.substring(i + 1, url.length);
  document.querySelector(".problem_number").innerText = probNum;
  loadName(probNum);
}

function findProbNum() {
  chrome.tabs.query(
    { active: true, lastFocusedWindow: true, currentWindow: true },
    function (tabs) {
      let url = tabs[0].url;
      getProbNum(url);
    }
  );
}

function init() {
  findProbNum();
}

init();
