chrome.tabs.executeScript(
  {
    code: 'document.querySelector(".col-md-9").innerText',
  },
  function (result) {
    const numberText = result[0];
    console.log(numberText);
    const myNum = numberText.match(new RegExp("\\b1000\\b", "gi")).length;
    if (myNum >= 1) {
      document.querySelector("span").innerText = "solved";
    } else {
      document.querySelector("span").innerText = "yet";
    }
  }
);
