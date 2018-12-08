/* eslint-disable no-undef */
/* eslint-disable func-names */
window.onload = function () {
  const signUpBtn = document.getElementById('signup');
  const fistName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  async function sinup() {
    const rawResponse = await fetch('http://localhost:3000/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify({
        email: email.value,
        firstName: fistName.value,
        lastName: lastName.value,
        password: password.value,
        username: username.value,
      }),
    });
    const content = await rawResponse.json();
    document.getElementById('output').innerHTML = content.message;
  }
  if (signUpBtn) {
    signUpBtn.addEventListener('click', sinup);
  }
};
