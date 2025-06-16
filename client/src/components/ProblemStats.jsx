import { useState, useMemo } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, eachDayOfInterval } from "date-fns";

export default function ProblemStats({ submissions }) {
  const [days, setDays] = useState(30);

  const filtered = useMemo(() => {
    const since = subDays(new Date(), days).getTime() / 1000;
    return submissions.filter(
      (s) => s.verdict === "OK" && s.creationTimeSeconds >= since && s.problem.rating
    );
  }, [days, submissions]);

  const mostDifficult = filtered.reduce((max, s) =>
    !max || (s.problem.rating || 0) > max.problem.rating ? s : max,
    null
  );

  const total = filtered.length;
  const avgRating =
    total > 0 ? Math.round(filtered.reduce((a, b) => a + b.problem.rating, 0) / total) : 0;
  const avgPerDay = total / days;

  const ratingBuckets = {};
  filtered.forEach((s) => {
    const r = s.problem.rating;
    ratingBuckets[r] = (ratingBuckets[r] || 0) + 1;
  });

  const barData = Object.entries(ratingBuckets)
    .map(([r, count]) => ({ rating: r, count }))
    .sort((a, b) => a.rating - b.rating);

  const heatmapData = useMemo(() => {
    const map = {};
    filtered.forEach((s) => {
      const d = format(new Date(s.creationTimeSeconds * 1000), "yyyy-MM-dd");
      map[d] = (map[d] || 0) + 1;
    });

    return eachDayOfInterval({
      start: subDays(new Date(), days),
      end: new Date(),
    }).map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      count: map[format(date, "yyyy-MM-dd")] || 0,
    }));
  }, [filtered, days]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Problem Solving Data</h2>
        <select
          className="border p-1 rounded"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>
      </div>

      <div className="mb-2">
        <p><strong>Total Solved:</strong> {total}</p>
        <p><strong>Average Rating:</strong> {avgRating}</p>
        <p><strong>Avg per Day:</strong> {avgPerDay.toFixed(2)}</p>
        <p><strong>Most Difficult Problem:</strong> {mostDifficult?.problem?.name} ({mostDifficult?.problem?.rating})</p>
      </div>

      <h3 className="mt-4 mb-2 font-semibold">Bar Chart by Rating</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={barData}>
          <XAxis dataKey="rating" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="mt-6 mb-2 font-semibold">Submission Heatmap</h3>
      <CalendarHeatmap
        startDate={subDays(new Date(), days)}
        endDate={new Date()}
        values={heatmapData}
        classForValue={(v) => `color-github-${Math.min(v.count, 4)}`}
        tooltipDataAttrs={(v) => ({ "data-tip": `${v.date} - ${v.count} submissions` })}
      />
    </div>
  );
}
