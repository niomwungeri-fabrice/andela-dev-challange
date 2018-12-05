/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
window.onload = async () => {
  const token = await localStorage.getItem('token');
  fetch('https://andela-dev-challenge.herokuapp.com/api/v1/parcels', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then(parcels => $(document).ready(() => {
      let tr;
      for (let index = 0; index < parcels.data.length; index++) {
        tr = $('<tr/>');
        tr.append(`<td>${parcels.data[index].location}</td>`);
        tr.append(`<td>${parcels.data[index].destination}</td>`);
        tr.append(`<td>${parcels.data[index].present_location}</td>`);
        tr.append(`<td>${parcels.data[index].weight}</td>`);
        tr.append(`<td>${parcels.data[index].receiver_phone}</td>`);
        tr.append(`<td>${parcels.data[index].status}</td>`);

        $('table').append(tr);
      }
    }))
    .catch(error => error.stack);
};
