import { connect } from 'mongoose';

const connectDB = async (): Promise<boolean> => {
  try {
    const { DB_URI, DB_NAME } = process.env;
    const uri = `${DB_URI}/${DB_NAME}`;

    await connect(uri);
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected...');
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error to connect mongodb');
  }
  return false;
};

export default connectDB;
