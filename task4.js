function showSection(sectionId) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach(section => section.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

// To-Do List
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  savedTasks.forEach(task => {
    const li = createTaskElement(task.text, task.done);
    list.appendChild(li);
  });
}

function createTaskElement(text, done = false) {
  const li = document.createElement("li");
  if (done) li.classList.add("task-done");
  li.innerHTML = `
    <span>${text}</span>
    <div class="task-actions">
      <button onclick="toggleTask(this)">✓</button>
      <button onclick="removeTask(this)">🗑️</button>
    </div>
  `;
  return li;
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  const li = createTaskElement(text);
  document.getElementById("taskList").appendChild(li);
  input.value = "";
  saveTasks();
}

function toggleTask(button) {
  const li = button.closest("li");
  li.classList.toggle("task-done");
  saveTasks();
}

function removeTask(button) {
  const li = button.closest("li");
  li.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll("#taskList li")).map(li => ({
    text: li.querySelector("span").textContent,
    done: li.classList.contains("task-done")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("load", loadTasks);

const products = [
  { name: "Smart Watch", rating: 4.5, available: true, image: "images/smartwatch.png" },
  { name: "Wireless Earbuds", rating: 4.2, available: true, image: "images/earbuds.jpg" },
  { name: "Bluetooth Speaker", rating: 4.7, available: false, image: "images/speaker.png" },
  { name: "Fitness Band", rating: 3.9, available: true, image: "images/fitness-band.jpg" },
  { name: "Tablet Stand", rating: 4.8, available: true, image: "images/tablet-stand.jpg" },
  { name: "Gaming Mouse", rating: 4.3, available: false, image: "images/gaming-mouse.jpeg" },
  { name: "Mini Drone", rating: 4.9, available: true, image: "images/mini-drone.jpeg" }
];


function displayProducts(filteredProducts = products) {
  const container = document.querySelector(".products");
  container.innerHTML = "";
  filteredProducts.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}"/>
      <h4>${p.name}</h4>
      <p>Rating: ${p.rating} ⭐</p>
      <p>${p.available ? "In Stock" : "Out of Stock"}</p>
      <button>Select</button>
    `;
    container.appendChild(div);
  });
}

function setupProductFilter() {
  const filterBar = document.createElement("div");
  filterBar.className = "filter-bar";
  filterBar.innerHTML = `
    <select id="filter">
      <option value="all">All</option>
      <option value="rating">Highest Rated</option>
      <option value="available">Available Only</option>
    </select>
  `;
  const productsSection = document.querySelector("#products");
  productsSection.insertBefore(filterBar, productsSection.children[1]);

  document.getElementById("filter").addEventListener("change", (e) => {
    let sorted = [...products];
    if (e.target.value === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (e.target.value === "available") {
      sorted = sorted.filter(p => p.available);
    }
    displayProducts(sorted);
  });
}

window.addEventListener("load", () => {
  displayProducts();
  setupProductFilter();
});
