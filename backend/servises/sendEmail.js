"use strict";
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
// const nodemailer = require("nodemailer");
// const { PASSWORD_META } = process.env;
// async..await is not allowed in global scope, must use a wrapper
module.exports = async function (data) {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.meta.ua",
    //   port: 465,
    //   secure: true, // true for 465, false for other ports
    //   auth: {
    //     user: "alexandrokrk@meta.ua", // generated ethereal user
    //     pass: PASSWORD_META, // generated ethereal password
    //   },
    // });

    // send mail with defined transport object
    const { userName, userEmail, userText } = data;

    const output = `
    <h3>Шановний ${userName}! </h3>
    <p>Ми отримали ваше повідомлення: "${userText}" та раді відповісти вам </p>
    <p>Ми розглянули вашу пропозицію та вітаємо вас Ви в нашій команді</p> <p style="font-size:100px">&#129409;</p>`;

    const mail = {
      to: userEmail,
      subject: "Вітаємо",
      html: output,
      from: "alexandrokrk@gmail.com",
    };
    await sgMail.send(mail);
    return true;

    // const options = {
    //   to: userEmail, // list of receivers
    //   from: "alexandrokrk@meta.ua", // sender address
    //   subject: "Вітаємо", // Subject line
    //   text: userText, // plain text body
    //   html: output, // html body
    // };
    // console.log(options);
    // let info = await transporter.sendMail(options);
    // console.log("send");
    // //
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    console.log("error", error.message);
  }
};
