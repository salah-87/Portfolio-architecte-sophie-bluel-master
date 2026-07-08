function createGallery(work) {
            const gallery = document.querySelector('.figure');
            let figure = document.createElement('figure');
            let img = document.createElement('img');
            let figcaption = document.createElement('figcaption');
            img.src = work.imageUrl;
            img.alt = work.title;
            figcaption.textContent = work.title;
            figure.appendChild(img);
            figure.appendChild(figcaption)
            gallery.appendChild(figure)
}
function fetchWorks() {
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
        works.forEach(work => {
           createGallery(work)
        });
    })
    .catch(error => {
      console.error('Error fetching works:', error);
    });
}
fetchWorks()

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
fetchCategories()

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
})
let loginForm = document.querySelector('#login form');
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let username = document.querySelector('#username').value;
  let password = document.querySelector('#password').value;
  loginForm.innerHTML = `<p>Nom d'utilisateur: ${username}</p><p>Mot de passe: ${password}</p>`;
  const loginData = document.querySelector('#login form').elements;
  const formData = {
    username: loginData.username.value,
    password: loginData.password.value
  };
})

