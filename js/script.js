/* eslint-disable no-undef */
/* eslint-disable func-names */
window.onload = function () {
  const signUpBtn = document.getElementById('signup');
  const fistName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const username = document.getElementById('username');
  const password = document.getElementById('password');


  if (signUpBtn) {
    // eslint-disable-next-line no-use-before-define
    signUpBtn.addEventListener('click', sinup);
  }

  async function sinup() {
    const rawResponse = await fetch('https://andela-dev-challenge.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
};
