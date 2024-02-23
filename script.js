const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list")) || []; // Add this line

if (list) {
  // Add this condition
  list.forEach((task) => {
    toDoList(task);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value;
  if (task) {
    newTask = task.name;
  }
  const liEl = document.createElement("li");

  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`; // Fixed the closing tag here
  liEl.appendChild(checkBtnEl);
  const deleteBtnEl = document.createElement("div");
  deleteBtnEl.innerHTML = `<i class="fas fa-trash"></i>`; // Fixed the closing tag here
  liEl.appendChild(deleteBtnEl);

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  deleteBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}

// this function is for the toggle
function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  root.className = newTheme;
}
document.querySelector(".theme-toggle").addEventListener("click", setTheme);
