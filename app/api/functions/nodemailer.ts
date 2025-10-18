import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "kamaleshsuresh426@gmail.com",
    pass: "dsbkobpbfnrctbkc",
  },
});

export const sendMail = (target:string,subject:string,text:string,html:string) =>{

    (async () => {
  const info = await transporter.sendMail({
    from: 'kamaleshsuresh426@gmail.com',
    to: target,
    subject: subject,
    text: text, // plain‑text body
    html:html, // HTML body
  });

})();
}


 