import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

export default function ContestHistory({ contests }) {
  const [days, setDays] = useState(90);
  const filtered = contests?.filter((c) => {
    const diff = (Date.now() - new Date(c.ratingUpdateTimeSeconds * 1000)) / (1000 * 60 * 60 * 24);
    return diff <= days;
  });

  const chartData = filtered.map((c) => ({
    name: format(new Date(c.ratingUpdateTimeSeconds * 1000), "MMM d"),
    rating: c.newRating,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Contest History</h2>
        <select
          className="border p-1 rounded"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
          <option value={365}>Last 365 Days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="rating" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <table className="w-full mt-4 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Contest</th>
            <th className="p-2">Date</th>
            <th className="p-2">Rating Δ</th>
            <th className="p-2">Rank</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{c.contestName}</td>
              <td className="p-2">{format(new Date(c.ratingUpdateTimeSeconds * 1000), "yyyy-MM-dd")}</td>
              <td className="p-2">{c.newRating - c.oldRating}</td>
              <td className="p-2">{c.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
