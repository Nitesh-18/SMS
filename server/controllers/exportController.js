import { Parser } from "json2csv";
import Student from "../models/Student.js";

export const downloadCSV = async (req, res) => {
  try {
    const students = await Student.find();

    const fields = [
      { label: "Name", value: "name" },
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "Codeforces Handle", value: "codeforcesHandle" },
      { label: "Current Rating", value: "currentRating" },
      { label: "Max Rating", value: "maxRating" },
    ];

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(students);

    res.header("Content-Type", "text/csv");
    res.attachment("students.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate CSV" });
  }
};
