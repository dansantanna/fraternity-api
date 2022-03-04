import sendgrid from '@sendgrid/mail';
import fs from 'fs/promises';
import path from 'path';

const sendMail = async (to: string, subject: string, content: string) => {
  sendgrid.setApiKey(process?.env?.SENDGRID_API_KEY || '');
  const from = process?.env?.EMAIL_FROM ?? '';
  await sendgrid.send({ from, to, subject, html: content });
};
interface DataObject {
  [key: string]: string;
}

export const applyDataToTemplate = async (name: string, data: DataObject) => {
  let template = await fs.readFile(
    path.join(`${__dirname}/../templates/${name}.html`),
    'utf-8',
  );
  // eslint-disable-next-line prettier/prettier
  const dataKeys = Object.keys(data) as Array<keyof DataObject>;
  dataKeys.forEach((key) => {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
  });
  return template;
};

export default sendMail;
