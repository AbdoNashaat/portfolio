'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });





// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// project rendering logic
const projectListContainer = document.getElementById("project-list");

if (projectListContainer && typeof projectsData !== 'undefined') {
  projectsData.forEach(project => {
    const techStackHtml = project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('\n                  ');

    const projectItem = document.createElement("li");
    projectItem.className = "project-item active";
    projectItem.dataset.filterItem = "";
    projectItem.dataset.category = project.category;

    projectItem.innerHTML = `
      <a href="${project.link}" ${project.target ? `target="${project.target}"` : ''} ${project.target === '_blank' ? 'rel="noopener noreferrer"' : ''}>
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </figure>
        <h3 class="project-title">${project.title} <i style="color: #777;">${project.subtitle}</i></h3>
        <p class="project-category">${project.categoryLabel}</p>
        <p class="project-desc">${project.desc}</p>
        <div class="project-tech-stack">
          ${techStackHtml}
        </div>
      </a>
    `;
    projectListContainer.appendChild(projectItem);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

function copyEmail() {
  const email = document.getElementById('email-text').innerText;
  const icon = document.getElementById('copy-icon');

  // Copy to clipboard
  navigator.clipboard.writeText(email).then(() => {
    // Visual feedback: change icon to a checkmark
    icon.setAttribute('name', 'checkmark-outline');
    
    // Change it back after 2 seconds
    setTimeout(() => {
      icon.setAttribute('name', 'copy-outline');
    }, 2000);
  });
}

