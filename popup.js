// When the button is clicked, run script
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openWikiArticle,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
const openWikiArticle = () => {
  const getSelectionText = () => {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  };

  let selected = getSelectionText();

  if (selected !== "") {
    let URL = "https://en.wikipedia.org/wiki/" + selected;
    window.open(URL, "_blank");
  }
};
