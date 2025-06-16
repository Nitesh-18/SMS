import Student from "../models/Student.js";
import axios from "axios";

export const syncNowByHandle = async (req, res) => {
  const { handle } = req.body;

  try {
    const ratingURL = `https://codeforces.com/api/user.rating?handle=${handle}`;
    const infoURL = `https://codeforces.com/api/user.info?handles=${handle}`;

    const [ratingRes, infoRes] = await Promise.all([
      axios.get(ratingURL),
      axios.get(infoURL),
    ]);

    const contests = ratingRes.data.result;
    const info = infoRes.data.result[0];

    const student = await Student.findOneAndUpdate(
      { codeforcesHandle: handle },
      {
        currentRating: info.rating,
        maxRating: info.maxRating,
        contests,
        lastSynced: new Date(),
      },
      { new: true }
    );

    res.json({ message: "Synced successfully", student });
  } catch (error) {
    res.status(400).json({ error: "Invalid handle or sync failed" });
  }
};
