/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
window.onload = async () => {
  const token = await localStorage.getItem('token');
  fetch('http://localhost:3000/api/v1/parcels', {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/JSON',
      'x-access-token': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(parcels => console.log(parcels))
    .catch(error => console.log(error));
};
