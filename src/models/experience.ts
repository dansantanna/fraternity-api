import { Schema, model } from 'mongoose';

const modelName = 'Experience';

export const ExperienceSchema = new Schema(
  {
    companyName: String,
    startedAt: Date,
    finishedAt: Date,
    description: String,
  },
  {
    collection: 'experiences',
    timestamps: true,
  },
);

const Experience = model(modelName, ExperienceSchema);
export default Experience;
