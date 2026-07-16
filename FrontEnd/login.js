// 1. On récupère le formulaire par son id
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    console.log('Email:', email);
    console.log('Mot de passe:', password);

    // TODO: envoyer les informations au backend pour authentification
  });
}
// retour vers la page d'accueil   
const loginButton = document.getElementById('loginBtn');
if (loginButton) {
  loginButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}
