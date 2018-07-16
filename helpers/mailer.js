const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport(
  {
    service: 'Gmail',
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.USERMAILPASSWORD
    }

}

)

exports.sendActivationLink = (user) => {
  const options = {
    from: '"Bienvenido" <tererojas.i@gmail.com>',
    to:  user.email,
    subject: 'Bienvenido',
    html: `<h2>Activa tu cuenta: <a href="http://localhost:3000/activation">Click aqui</a></h2>`,
  };
  transporter.sendMail(options);
}





