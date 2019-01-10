
/* eslint-disable no-undef */
window.onload = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const id = url.searchParams.get('id');
  const uptateBtn = document.getElementById('update-parcel');
  (this.viewDetail = async () => {
    const token = await localStorage.getItem('token');
    fetch(`hhttps://andela-dev-challenge.herokuapp.com/api/v1/parcels/${id}/admin`, {
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
    const parcelpresentLocation = document.getElementById('present-location-parcel').value;
    // change present location
    fetch(`https://andela-dev-challenge.herokuapp.com/api/v1/parcels/${id}/presentLocation`, {
      method: 'PUT',
      body: JSON.stringify({
        presentLocation: parcelpresentLocation,
      }),
      headers: {
        'Content-Type': 'Application/JSON',
        'x-access-token': token,
      },
    });
    // change status
    fetch(`hhttps://andela-dev-challenge.herokuapp.com/api/v1/parcels/${id}/status`, {
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
            document.getElementById('output-success').style.display = 'block';
            document.getElementById('output-success').innerHTML = message;
            setTimeout(() => {
              window.location.href = 'admin.html';
            }, 4000);
          } else if (status === 202) {
            document.getElementById('output-info').style.display = 'block';
            document.getElementById('output-info').innerHTML = message;
          } else {
            document.getElementById('output-error').style.display = 'block';
            document.getElementById('output-error').innerHTML = message;
          }
        }).catch(err => err);
    });
  };

  if (uptateBtn) {
    uptateBtn.addEventListener('click', updateParcel);
  }
};
