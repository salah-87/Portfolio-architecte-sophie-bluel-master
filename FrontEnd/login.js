// 1. On récupère le formulaire par son id
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

   fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      // TODO: gérer la réponse du backend (ex: stocker le token, rediriger vers la page d'accueil, etc.)
    })
    .catch(error => {
      console.error('Erreur lors de la connexion :', error);
    });
  });
}
// retour vers la page d'accueil   
const loginButton = document.getElementById('loginBtn');
if (loginButton) {
  loginButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}
