import { Schema, model } from 'mongoose';

const modelName = 'Academy';

export const AcademySchema = new Schema(
  {
    type: String,
    name: String,
    description: String,
    startedAt: Date,
    finishedAt: Date,
  },
  {
    collection: 'academics',
    timestamps: true,
  },
);

const Academy = model(modelName, AcademySchema);
export default Academy;
