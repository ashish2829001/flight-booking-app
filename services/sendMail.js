const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.MAILER || "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";

const sendMail = (email, name, flight) => {

  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: 'ats.frshr@gmail.com',
    name: 'Ashish',
  }
  const receivers = [
    {
      email: email,
    },
  ]

  let txtMsg = 'Hello ' + name + ',\n' + "Your ticket booking in flight no " + flight + " is successful.\n\nThanks for booking flight ticket with us.\n\nThanks & Regards,\nAshish"

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Ticket booked successfully...',
      textContent: txtMsg,
    })
    .then((msg) => {
      console.log("success");
    })
    .catch((err) => {
      console.log("failed");
    })
}

module.exports = sendMail;