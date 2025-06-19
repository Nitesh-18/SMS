import { useEffect, useState } from "react";

export default function EditStudentModal({ onClose, onUpdate, student }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    codeforcesHandle: "",
  });

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        codeforcesHandle: student.codeforcesHandle || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate({ ...form, _id: student._id });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-center dark:text-white">
          Edit Student
        </h2>

        <div className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 rounded bg-slate-100 dark:bg-slate-700 dark:text-white"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 rounded bg-slate-100 dark:bg-slate-700 dark:text-white"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 rounded bg-slate-100 dark:bg-slate-700 dark:text-white"
          />
          <input
            name="codeforcesHandle"
            value={form.codeforcesHandle}
            onChange={handleChange}
            placeholder="Codeforces Handle"
            className="w-full p-2 rounded bg-slate-100 dark:bg-slate-700 dark:text-white"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded bg-gray-300 dark:bg-slate-600 text-black dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-1 rounded bg-primary text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
