/* eslint-disable no-undef */
window.onload = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const id = url.searchParams.get('id');
  const uptateBtn = document.getElementById('update-parcel');
  (this.viewDetail = async () => {
    const token = await localStorage.getItem('token');
    fetch(`http://localhost:3000/api/v1/parcels/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON',
        'x-access-token': token,
      },
    }).then((res) => {
      res.json().then(async (results) => {
        const { data } = results;
        document.getElementById('location-parcel').value = data.location;
        document.getElementById('location-parcel').disabled = true;
        document.getElementById('present-location-parcel').value = data.present_location;
        document.getElementById('destination-parcel').value = data.destination;
        document.getElementById('destination-parcel').disabled = true;
        document.getElementById('weight-parcel').value = data.weight;
        document.getElementById('weight-parcel').disabled = true;
        document.getElementById('phone-parcel').value = data.receiver_phone;
        document.getElementById('phone-parcel').disabled = true;
        document.getElementById('status-parcel').value = data.status;
        let dateString = data.created_date;
        dateString = new Date(dateString).toUTCString();
        dateString = dateString.split(' ').slice(0, 5).join(' ');
        document.getElementById('createdTime-parcel').value = dateString;
        document.getElementById('createdTime-parcel').disabled = true;
      }).catch(err => err.stack);
    });
  })();

  this.updateParcel = async () => {
    const token = await localStorage.getItem('token');
    const parcelStatus = document.getElementById('status-parcel').value;
    fetch(`http://localhost:3000/api/v1/parcels/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({
        status: parcelStatus,
      }),
      headers: {
        'Content-Type': 'Application/JSON',
        'x-access-token': token,
      },
    }).then((res) => {
      res.json()
        .then(async (results) => {
          const { message, status } = results;
          if (status === 200) {
            document.getElementById('output').innerHTML = message;
            setTimeout(() => {
              window.location.href = 'admin.html';
            }, 2000);
          } else {
            window.location.href = 'admin.html';
          }
        }).catch(err => err);
    });
  };

  if (uptateBtn) {
    uptateBtn.addEventListener('click', updateParcel);
  }
};
