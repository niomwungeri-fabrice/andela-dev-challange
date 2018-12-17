import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const newUserEmail = (email, firstName, lastName, status, presentationLocation) => {
  const msg = {
    to: email,
    from: 'niomwungeri.fabrice@gmail.com',
    subject: 'Parcel delivery information',
    html: `Dear ${firstName} ${lastName}, <br><br>
    Your parcel delivery order information has been changed as follows: <br> <br>
    <ul>
      <li>Status : <strong>${status}</strong></li>
      <li>Present Location : <strong>${presentationLocation}</strong></li>
    </ul>
    <br><br>
    Thank you for using our platform.
    `,
  };
  sgMail.send(msg)
    .then(sent => sent)
    .catch(error => error);
};


export default {
  newUserEmail,
};
