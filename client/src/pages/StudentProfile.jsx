import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContestHistory from "../components/ContestHistory";
import ProblemStats from "../components/ProblemStats";

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [id]);

  if (!student) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{student.name}'s Profile</h1>
      <p className="text-gray-600 mb-4">Codeforces Handle: {student.codeforcesHandle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContestHistory contests={student.contests} />
        <ProblemStats submissions={student.submissions || []} />
      </div>
    </div>
  );
}
