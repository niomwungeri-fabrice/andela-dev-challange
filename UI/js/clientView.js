/* eslint-disable no-unused-vars */
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
  const pricePerKg = 100;
  const parcelTable = document.getElementById('parcels');
  fetch('http://localhost:3000/api/v1/users/:userId/parcels', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((parcels) => {
      for (let index = 0; index < parcels.data.length; index++) {
        const tr = document.createElement('tr');
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
        tr.innerHTML = `
          <tr>
            <td>${parcels.data[index].location}</td>
            <td>${parcels.data[index].destination}</td>
            <td>${parcels.data[index].present_location}</td>
            <td>${parcels.data[index].weight}</td>
            <td>${parcels.data[index].weight * pricePerKg}</td>
            <td>${parcels.data[index].receiver_phone}</td>
            <td>${parcels.data[index].status}</td>
            <td>
                <a href="editPersonal.html" onclick="editParcel(hdkjfd);return false;"> <i class="fas fa-edit"></i></a>
                <i class="fas fa-info-circle"></i>
                <i class="fas fa-times-circle"></i>
            </td>
          </tr>
        `;
        parcelTable.appendChild(tr);
      }
      document.getElementById('pending').innerHTML = pending;
      document.getElementById('arrived').innerHTML = arrived;
      document.getElementById('transit').innerHTML = transit;
      document.getElementById('delivered').innerHTML = delivered;
      document.getElementById('cancelled').innerHTML = cancelled;
      const cancelBtn = document.getElementById('cancel');
      function editParcel(params) {
        console.log(params);
      }
    })
    .catch(error => error.stack);
};
