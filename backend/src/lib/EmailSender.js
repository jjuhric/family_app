import { createTransport } from 'nodemailer';


class EmailSender {
  constructor(x) {
    this.transporter = createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendEmail(to, subject, text) {
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      text: text
    };
    if (subject) {
      mailOptions.subject = subject;
    }

    await this.transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

export default EmailSender;
