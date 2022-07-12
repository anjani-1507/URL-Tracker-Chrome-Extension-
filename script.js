const inputbtn = document.getElementById("input-btn");
const deletebtn = document.getElementById("delete-btn");
const tabbtn = document.getElementById("tab-btn");
let mylead = [];
const inputel = document.getElementById("input-el");
let ulel = document.querySelector("#ul-el");
const leadsFromStorage = JSON.parse(localStorage.getItem("mylead"));
const darkmode = document.getElementById("dark-mode");
const lightmode = document.getElementById("light-mode");
let bodycolor = document.body.style;

if (leadsFromStorage) {
  mylead = leadsFromStorage;
  renderlist(mylead);
}

function renderlist(lead) {
  let listItem = "";
  let l = lead.length;
  for (let i = 0; i < l; i++) {
    listItem += `<li>
        <a target="_blank" href="${lead[i]}">
        ${lead[i]}
        </a>
        </li>`;
  }
  ulel.innerHTML = listItem;
}

inputbtn.addEventListener("click", function () {
  mylead.push(inputel.value);
  localStorage.setItem("mylead", JSON.stringify(mylead));
  inputel.value = "";
  renderlist(mylead);
});

deletebtn.addEventListener("dblclick", function () {
  localStorage.clear();
  mylead = [];
  renderlist(mylead);
});

tabbtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    mylead.push(tabs[0].url);
    localStorage.setItem("mylead", JSON.stringify(mylead));
    renderlist(mylead);
  });

  renderlist(mylead);
});

darkmode.addEventListener("click", function () {
  bodycolor.backgroundColor = "black";
  lightmode.checked=false
});
lightmode.addEventListener("click", function () {
    bodycolor.backgroundColor = "white";
    darkmode.checked=false
  });
