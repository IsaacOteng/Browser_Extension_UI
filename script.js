// Store loaded data globally for filtering
let allExtensions = [];

// Dynamically generate cards from data.json
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    // Assign a unique uniqueid to each extension if not present
    allExtensions = data.map((item, index) => ({ ...item, uniqueid: item.uniqueid || index + '_' + Date.now() }));
    renderCards(allExtensions);
  }
)
  .catch(error => {
    console.error("Error loading data:", error);
    const cardContainer = document.querySelector(".cards");
    cardContainer.innerHTML = "<p>Error loading extensions. Please try again later.</p>";
  }
) 
;

function renderCards(data) {
  const cardContainer = document.querySelector(".cards");
  cardContainer.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(item.isActive ? "active" : "inactive");
    card.setAttribute('data-index', item.uniqueid);
    // Prevent label and remove button from overlapping by wrapping them in separate containers
    card.innerHTML = `
      <div class="card-details">
        <img src="${item.logo}" alt="icon" class="card-image">
        <div class="content">
          <div class="card-title">${item.title}</div>
          <div class="card-description">${item.description}</div>
        </div>
      </div>
      <div class="buttons">
        <span class="remove-wrap"><button class="remove" type="button" tabindex="-1">Remove</button></span>
        <span class="switch-wrap"><label class="switch-label" for="switch-${item.uniqueid}" tabindex="-1"></label>
        <input type="checkbox" class="onoff" id="switch-${item.uniqueid}" name="switch" ${item.isActive ? 'checked' : ''} tabindex="0"></span>
      </div>
    `;
    cardContainer.appendChild(card);
  });
  attachCardEvents();
  updateFilterButtonStyles();
}

// Filter buttons
const allBtn = document.querySelector('.state-all');
const activeBtn = document.querySelector('.state-active');
const inactiveBtn = document.querySelector('.state-Inactive');

// Track current filter state
let currentFilter = "all";

allBtn.addEventListener('click', () => {
  currentFilter = 'all';
  renderCards(allExtensions);
});
activeBtn.addEventListener('click', () => {
  currentFilter = 'active';
  renderCards(allExtensions.filter(e => e.isActive));
});
inactiveBtn.addEventListener('click', () => {
  currentFilter = 'inactive';
  renderCards(allExtensions.filter(e => !e.isActive));
});


function getFilteredExtensions() {
  if (currentFilter === 'active') return allExtensions.filter(e => e.isActive);
  if (currentFilter === 'inactive') return allExtensions.filter(e => !e.isActive);
  return allExtensions;
}


function updateFilterButtonStyles() {
  allBtn.classList.remove('selected', 'active', 'inactive');
  activeBtn.classList.remove('selected', 'active', 'inactive');
  inactiveBtn.classList.remove('selected', 'active', 'inactive');
  if (currentFilter === 'all') allBtn.classList.add('selected');
  if (currentFilter === 'active') activeBtn.classList.add('selected');
  if (currentFilter === 'inactive') inactiveBtn.classList.add('selected');
}


function attachCardEvents() {
  // Remove button  
  document.querySelectorAll('.card .remove').forEach((btn) => {
    btn.onclick = function(e) {
      e.stopPropagation(); // Prevent bubbling to label or card
      const card = btn.closest('.card');
      const uniqueid = card ? card.getAttribute('data-index') : null;
      const realIdx = allExtensions.findIndex(e => e.uniqueid === uniqueid);
      if (realIdx > -1) {
        allExtensions.splice(realIdx, 1);
        renderCards(getFilteredExtensions());
      }
    };
  });
  // On/Off toggle
  document.querySelectorAll('.card .onoff').forEach((checkbox) => {
    const label = checkbox.previousElementSibling;
    if (label) {
      label.onclick = function(e) {
        e.stopPropagation(); // Prevent bubbling to card
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      };
    }
    checkbox.onchange = function(e) {
      e.stopPropagation();
      const card = checkbox.closest('.card');
      const uniqueid = card ? card.getAttribute('data-index') : null;
      const realIdx = allExtensions.findIndex(e => e.uniqueid === uniqueid);
      if (realIdx > -1) {
        allExtensions[realIdx].isActive = checkbox.checked;
        renderCards(getFilteredExtensions());
      }
    };
  });
}

// Theme toggler logic
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    darkModeToggle.src = 'assets/images/icon-moon.svg';
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    darkModeToggle.src = 'assets/images/icon-sun.svg';
    localStorage.setItem('theme', 'dark');
  }
}

// Initial theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme('dark');
}

darkModeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
});