import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudents, deleteStudent, downloadCSV } from "../api/studentApi";

export default function StudentTable() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const getStudents = async () => {
        const data = await fetchStudents();
        setStudents(data);
    };

    const handleDelete = async (id) => {
        await deleteStudent(id);
        getStudents(); // refresh
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Student Table</h1>
                <button
                    onClick={downloadCSV}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Download CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border rounded shadow">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Handle</th>
                            <th className="p-2">Current</th>
                            <th className="p-2">Max</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s._id} className="border-t">
                                <td className="p-2">{s.name}</td>
                                <td className="p-2">{s.email}</td>
                                <td className="p-2">{s.phone}</td>
                                <td className="p-2">{s.codeforcesHandle}</td>
                                <td className="p-2">{s.currentRating}</td>
                                <td className="p-2">{s.maxRating}</td>
                                <td className="p-2 space-x-2">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => navigate(`/student/${s._id}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="text-yellow-500 hover:underline"
                                        onClick={() => alert("TODO: Edit")}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete(s._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {students.length === 0 && (
                    <div className="text-center p-4 text-gray-500">No students found.</div>
                )}
            </div>
        </div>
    );
}
