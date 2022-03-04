import sendgrid from '@sendgrid/mail';

const sendMail = async (to: string, subject: string, content: string) => {
  sendgrid.setApiKey(process?.env?.SENDGRID_API_KEY || '');
  const from = process?.env?.EMAIL_FROM ?? '';
  await sendgrid.send({ from, to, subject, html: content });
};

export default sendMail;
