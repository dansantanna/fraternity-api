import { Schema, model } from 'mongoose';

const modelName = 'Mentorship';

export const MentorshipSchema = new Schema({
  mentor: { type: Schema.Types.ObjectId, ref: 'User' },
  student: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Mentorship = model(modelName, MentorshipSchema);
export default Mentorship;
