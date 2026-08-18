function createGallery(work) {
  const gallery = document.querySelector('.figure');
  let figure = document.createElement('figure');
  let img = document.createElement('img');
  let figcaption = document.createElement('figcaption');
  img.src = work.imageUrl;
  img.alt = work.title;
  figcaption.textContent = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

function fetchWorks() {
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
      works.forEach(work => {
        createGallery(work);
      });
    })
    .catch(error => {
      console.error('Error fetching works:', error);
    });
}
fetchWorks();

function fetchCategories() {
  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const buttonFilters = document.querySelector('.button-filters');
        let button = document.createElement('button');
        button.textContent = category.name;
        buttonFilters.appendChild(button);
      });
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}
fetchCategories();

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(works => {
    const buttonFilters = document.querySelector('.button-filters');
    buttonFilters.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const categoryName = event.target.textContent;
        const filteredWorks = categoryName === 'Tout' ? works : works.filter(work => work.category.name === categoryName);
        const gallery = document.querySelector('.figure');
        gallery.innerHTML = '';
        filteredWorks.forEach(work => {
          createGallery(work);
        });
      }
    });
  });

const token = localStorage.getItem('token');
const loginButton = document.getElementById('loginBtn');

if (token) {
  const editBanner = document.querySelector('.edit-banner');
  if (editBanner) editBanner.style.display = 'flex';

  const modifierBtn = document.querySelector('.modifier-btn');
  if (modifierBtn) modifierBtn.style.display = 'flex';

  if (loginButton) {
    loginButton.textContent = 'logout';
    loginButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  }
} else {
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
}

const modifierBtn = document.querySelector('.modifier-btn');
const backgroundModale = document.getElementById('background-modale');

modifierBtn.addEventListener('click', () => {
  backgroundModale.style.display = 'flex';
});
const closeModaleBtn = document.getElementById('close-modale');

closeModaleBtn.addEventListener('click', () => {
  backgroundModale.style.display = 'none';
});