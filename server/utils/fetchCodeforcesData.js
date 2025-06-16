import axios from "axios";

export async function fetchSubmissions(handle) {
  const url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`;
  try {
    const res = await axios.get(url);
    const result = res.data.result;

    return result.map((sub) => ({
      problem: {
        name: sub.problem.name,
        rating: sub.problem.rating || null,
        tags: sub.problem.tags || [],
      },
      creationTimeSeconds: sub.creationTimeSeconds,
      verdict: sub.verdict,
    }));
  } catch (err) {
    console.error("Submission Fetch Failed", err.message);
    return [];
  }
}
