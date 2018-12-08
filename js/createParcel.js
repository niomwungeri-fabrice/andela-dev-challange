/* eslint-disable no-undef */
window.onload = () => {
  const location = document.getElementById('location-parcel');
  const presentLocation = document.getElementById('present-location-parcel');
  const destination = document.getElementById('destination-parcel');
  const weight = document.getElementById('weight-parcel');
  const phone = document.getElementById('phone-parcel');
  const createBtn = document.getElementById('createbtn-parcel');
  const createParcel = async () => {
    const token = await localStorage.getItem('token');
    fetch('http://localhost:3000/api/v1/parcels', {
      method: 'POST',
      body: JSON.stringify({
        location: location.value,
        destination: destination.value,
        presentLocation: presentLocation.value,
        weight: parseInt(weight.value, 10),
        receiverPhone: phone.value,
      }),
      headers: {
        'Content-Type': 'Application/JSON',
        'x-access-token': token,
      },
    }).then((res) => {
      res.json().then(async (results) => {
        const { message } = results;
        await localStorage.setItem('token', token);
        if (token) {
          document.getElementById('output').innerHTML = message;
        } else {
          document.getElementById('output').innerHTML = message;
        }
      }).catch(err => err);
    });
  };

  if (createBtn) {
    createBtn.addEventListener('click', createParcel);
  }
};
