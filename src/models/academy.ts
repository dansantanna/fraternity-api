import { Schema, model } from 'mongoose';

const modelName = 'Academy';

export const AcademySchema = new Schema({
  companyName: { type: String },
  startedAt: Date,
  finishedAt: Date,
  description: String,
});

const Academy = model(modelName, AcademySchema);
export default Academy;
