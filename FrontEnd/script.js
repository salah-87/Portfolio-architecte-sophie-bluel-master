let allWorks = [];

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
      allWorks = works;
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

// Filtres de catégories
document.querySelector('.button-filters').addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const categoryName = event.target.textContent;
    const filteredWorks = categoryName === 'Tout' ? allWorks : allWorks.filter(work => work.category.name === categoryName);
    const gallery = document.querySelector('.figure');
    gallery.innerHTML = '';
    filteredWorks.forEach(work => {
      createGallery(work);
    });
  }
});


// Mode admin / visiteur
const token = localStorage.getItem('token');
const loginButton = document.getElementById('loginBtn');

if (token) {
  const editBanner = document.querySelector('.edit-banner');
  if (editBanner) editBanner.style.display = 'flex';

  const modifierBtnEl = document.querySelector('.modifier-btn');
  if (modifierBtnEl) modifierBtnEl.style.display = 'flex';

  const buttonFilters = document.querySelector('.button-filters');
  if (buttonFilters) buttonFilters.style.display = 'none';

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

// Modale galerie photo
function renderModaleGallery() {
  const galleryModale = document.getElementById('gallery-modale');
  galleryModale.innerHTML = '';

  allWorks.forEach(work => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;

    const trash = document.createElement('span');
    trash.classList.add('delete-icon');
    trash.dataset.id = work.id;
trash.innerHTML = `<svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
</svg>`
;
    figure.appendChild(img);
    figure.appendChild(trash);
    galleryModale.appendChild(figure);
  });
}

const modifierBtn = document.querySelector('.modifier-btn');
const backgroundModale = document.getElementById('background-modale');

modifierBtn.addEventListener('click', () => {
  backgroundModale.style.display = 'flex';
  renderModaleGallery();
});

const closeModaleBtn = document.getElementById('close-modale');

closeModaleBtn.addEventListener('click', () => {
  backgroundModale.style.display = 'none';
});