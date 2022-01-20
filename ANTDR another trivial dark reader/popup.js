let dayMode = document.getElementById("dayMode");
let nightMode = document.getElementById("nightMode");

// When the dayMode button is clicked, inject letThereBeLight into current page
dayMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: letThereBeLight,
  });
});

// When the nightMode button is clicked, inject dimTheLights into current page
nightMode.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: dimTheLights,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function letThereBeLight() {
  let cover = document.getElementById("a-simple-day-night-cover-div-that-helps-you-mimic-dark-mode-also-this-id-has-to-be-very-unique-and-therefore-long-so-that-something-accidently-does-not-get-removed-when-you-press-a-button");
  if (cover && cover.parentElement) {
    cover.parentElement.removeChild(cover);
  }
}

// The body of this function will be executed as a content script inside the
// current page
function dimTheLights() {
  let id = "a-simple-day-night-cover-div-that-helps-you-mimic-dark-mode-also-this-id-has-to-be-very-unique-and-therefore-long-so-that-something-accidently-does-not-get-removed-when-you-press-a-button";
  let cover = document.getElementById(id);
  
  // Create
  if (!cover) {
    cover = document.createElement("div");
    
    let css = ` 
      position: fixed; 
      pointer-events: none; 
      top: 0; 
      left: 0; 
      width: 100vw; 
      height: 100vh; 
      background-color: white; 
      mix-blend-mode: difference; 
      z-index: 1; 
    `;
	
    cover.setAttribute("style", css);
	cover.setAttribute("id", id);
  }
  
  // Attach
  if (!cover.parentElement) {
    try {
      document.body.appendChild(cover);
	} catch (e) {}
  }
}
