const BASE_URL = "http://localhost:5000/api/students";

export const fetchStudents = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const deleteStudent = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};

export const downloadCSV = () => {
  window.open(`${BASE_URL}/export/csv`, "_blank");
};
