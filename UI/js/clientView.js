/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
window.onload = async () => {
  const token = await localStorage.getItem('token');
  let pending = 0;
  let arrived = 0;
  let transit = 0;
  let delivered = 0;
  let cancelled = 0;
  fetch('http://localhost:3000/api/v1/users/:userId/parcels', {
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
        if (parcels.data[index].status === 'PENDING') {
          pending++;
        } else if (parcels.data[index].status === 'IN_TRANSIT') {
          transit++;
        } else if (parcels.data[index].status === 'ARRIVED') {
          arrived++;
        } else if (parcels.data[index].status === 'DELIVERED') {
          delivered++;
        } else {
          cancelled++;
        }
        tr = $('<tr/>');
        tr.append(`<td>${parcels.data[index].location}</td>`);
        tr.append(`<td>${parcels.data[index].destination}</td>`);
        tr.append(`<td>${parcels.data[index].present_location}</td>`);
        tr.append(`<td>${parcels.data[index].weight}</td>`);
        tr.append(`<td>${parcels.data[index].receiver_phone}</td>`);
        tr.append(`<td>${parcels.data[index].status}</td>`);

        $('#parcels').append(tr);
      }
      document.getElementById('pending').innerHTML = pending;
      document.getElementById('arrived').innerHTML = arrived;
      document.getElementById('transit').innerHTML = transit;
      document.getElementById('delivered').innerHTML = delivered;
      document.getElementById('cancelled').innerHTML = cancelled;
    }))
    .catch(error => error.stack);
};
