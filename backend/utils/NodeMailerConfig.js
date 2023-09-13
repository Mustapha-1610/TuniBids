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
        <h2> Hello ${name} </h2>
        <p> Click below to active your account</p>
        <a href="http://localhost:3000/index/bidder/activation/${BidderId}/${ActivationCode}">Click Here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

export const sendSellerConfirmationEmail = (BusinessName, email) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Welcome to tuniBids - Your Business Account is Activated!",
      html: `
      <div>
      <h1> Business Account Activated </h1>
        <h2> Dear  ${BusinessName} </h2>
        <h3> We are pleased to inform you that your business account with tuniBids has been successfully activated! <br/>

You are now able to post auction listings and start doing business on our platform. We are excited to have you join our community of sellers and we look forward to seeing your listings.<br/>

As a seller on tuniBids, you have the opportunity to reach a wide range of customers and grow your business. We encourage you to take full advantage of this opportunity.</br>

If you need any assistance or have any questions, please do not hesitate to contact our support team. We are here to help you make the most of your tuniBids experience.</br>

Thank you for choosing tuniBids. We wish you all the best in your business endeavors.<br/>

Best Regards,

TuniBids Team</h3>
        <a href="http://localhost:3000/index/"><button>Login</button></a>
        </div>`,
    })
    .catch((err) => console.log(err));
};
