import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  codeforcesHandle: String,
  currentRating: Number,
  maxRating: Number,
  contests: Array,
  problems: Array,
  lastSynced: Date,
  remindersSent: { type: Number, default: 0 },
  allowReminders: { type: Boolean, default: true },
  remindersDisabled: { type: Boolean, default: false },
  submissions: [
    {
      problem: {
        name: String,
        rating: Number,
        tags: [String],
      },
      creationTimeSeconds: Number,
      verdict: String,
    },
  ],
});

export default model("Student", studentSchema);
