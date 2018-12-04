/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
window.onload = async () => {
  const token = await localStorage.getItem('token');
  console.log(token);
  fetch('http://localhost:3100/api/v1/parcels', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'Application/JSON',
      'x-access-token': token,
    }),
  })
    .then(res => res.json())
    .then(parcels => console.log(parcels))
    .catch(error => console.log(`type: ${error.stack}`));
};
