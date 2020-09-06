chrome.tabs.executeScript(
  {
    code: 'document.querySelector("problem_number").innerText',
  },
  function (result) {
    const numberText = result[0];
    const myNum = numberText.match(new RegExp("\\b \\b", "g"));
    if (myNum >= 1) {
      document.querySelector("span").innerText = "solved";
    } else {
      document.querySelector("span").innerText = "yet";
    }
  }
);
