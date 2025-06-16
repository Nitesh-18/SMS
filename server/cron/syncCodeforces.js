import cron from "node-cron";
import axios from "axios";
import Student from "../models/Student.js";

// Fetch contest + rating + info
const fetchCodeforcesContestData = async (handle) => {
  const ratingURL = `https://codeforces.com/api/user.rating?handle=${handle}`;
  const infoURL = `https://codeforces.com/api/user.info?handles=${handle}`;

  try {
    const [ratingRes, infoRes] = await Promise.all([
      axios.get(ratingURL),
      axios.get(infoURL),
    ]);

    const contests = ratingRes.data.result;
    const info = infoRes.data.result[0];

    return {
      currentRating: info.rating || 0,
      maxRating: info.maxRating || 0,
      contests,
    };
  } catch (error) {
    console.error(
      `❌ Error fetching contest data for ${handle}:`,
      error.message
    );
    return null;
  }
};

// Fetch submission history
const fetchSubmissions = async (handle) => {
  const subURL = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`;

  try {
    const res = await axios.get(subURL);
    const submissions = res.data.result;

    return submissions.map((s) => ({
      problem: {
        name: s.problem.name,
        rating: s.problem.rating || null,
        tags: s.problem.tags || [],
      },
      creationTimeSeconds: s.creationTimeSeconds,
      verdict: s.verdict,
    }));
  } catch (err) {
    console.error(`❌ Error fetching submissions for ${handle}:`, err.message);
    return [];
  }
};

// Main sync function
export const startCodeforcesSync = () => {
  cron.schedule("0 2 * * *", async () => {
    console.log("🔁 Codeforces sync started at 2 AM");

    const students = await Student.find();

    for (const student of students) {
      const handle = student.codeforcesHandle;

      const contestData = await fetchCodeforcesContestData(handle);
      const submissions = await fetchSubmissions(handle);

      if (contestData) {
        await Student.findByIdAndUpdate(student._id, {
          currentRating: contestData.currentRating,
          maxRating: contestData.maxRating,
          contests: contestData.contests,
          submissions: submissions,
          lastSynced: new Date(),
        });
      }

      // Inactivity Detection Logic
      if (student.allowReminders) {
        const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 3600;
        const recentActivity = submissions.some(
          (s) => s.verdict === "OK" && s.creationTimeSeconds > oneWeekAgo
        );

        if (!recentActivity) {
          const sent = await sendReminder(student.email, student.name);
          if (sent) {
            student.remindersSent += 1;
            await student.save();
          }
        }
      }
    }

    console.log("✅ Codeforces sync completed");
  });
};
