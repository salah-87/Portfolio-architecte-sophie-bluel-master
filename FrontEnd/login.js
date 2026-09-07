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
      .then(response => {
        if (!response.ok) {
          throw new Error('Identifiants incorrects');
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
      })
      .catch(error => {
        console.error('Erreur lors de la connexion :', error);
        afficherErreur();
      });
  });
}

function afficherErreur() {
  let errorMsg = document.querySelector('.error-message');
  if (!errorMsg) {
    errorMsg = document.createElement('p');
    errorMsg.classList.add('error-message');
    loginForm.appendChild(errorMsg);
  }
  errorMsg.textContent = 'Email ou mot de passe incorrect';
}