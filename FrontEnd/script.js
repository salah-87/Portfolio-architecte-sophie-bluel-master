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
        button.textContent = category.title;
        buttonFilters.appendChild(button);
      });
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}
fetchCategories()