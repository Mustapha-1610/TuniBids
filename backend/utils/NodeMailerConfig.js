import nodemailer from "nodemailer";
const user = "mustapha.talbi2002@gmail.com"; // hedhi t7ot feha l email
const pass = "zulnlgxilviuqmsy";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
//fonction te5ou 3 parametres
export const sendBidderConfirmationEmail = (
  name,
  email,
  BidderId,
  ActivationCode
) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Veuillez activer votre compte ",
      html: `
      <div>
      <h1> Account Activation </h1>
        <h3> Hello ${name} </h3>
        <p> Click below to active your account</p>
        <a href="http://localhost:3000/index/bidder/activation/${BidderId}/${ActivationCode}">Click Here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

export const sendSellerConfirmationEmail = (
  name,
  email,
  SellerId,
  ActivationCode
) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Veuillez activer votre compte ",
      html: `
      <div>
      <h1> Account Activation </h1>
        <h3> Hello ${name} </h3>
        <p> Your business have been accepted to be a part of our auction product </p>
        <a href="http://localhost:5000/Seller/api/verify/${SellerId}/${ActivationCode}"> Cliquez ici</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
