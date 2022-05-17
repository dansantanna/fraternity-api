import { Schema, model } from 'mongoose';

const modelName = 'Address';
export const AddressSchema = new Schema({
  street: String,
  city: String,
  zipcode: String,
  country: String,
});
const Address = model(modelName, AddressSchema);
export default Address;
