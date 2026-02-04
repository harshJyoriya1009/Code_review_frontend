import ScoreChart from "./charts/ScoreChart";
import IssueCountChart from "./charts/IssueCountChart";
import IssueCategoryPie from "./charts/IssueCategoryPie";

function AnalysisCharts({ result }) {
  if (!result) return null;

  return (
    <div style={wrapper}>
      <div style={row}>
        {/* Overall Score */}
        <div style={barCard}>
          <h4>⭐Overall Score</h4>
          <h3>{result.overall_score}/10</h3>
          <ScoreChart score={result.overall_score} />
        </div>

        {/* Risk Overview */}
        <div style={barCard}>
          <h4>❗Risk Overview</h4>
          <h4>Total Issues: {result.issues.length}</h4>
          <IssueCountChart count={result.issues.length} />
        </div>

        {/* Pie Chart */}
        <div style={pieCard}>
          <h4>🧩Issues by Category</h4>
          <IssueCategoryPie issues={result.issues} />
        </div>
      </div>
    </div>
  );
}

/* =========================
   STYLES
   ========================= */

const wrapper = {
  width: "100%",
  marginTop: "24px",
};

/* ONE ROW */
const row = {
  display: "grid",
  gridTemplateColumns: "1.3fr 1.3fr 1fr", // 🔥 key line
  gap: "24px",
  alignItems: "stretch",
};

/* Bar chart cards */
const barCard = {
  background: "#000000ff",
  padding: "20px",
  borderRadius: "14px",
  height: "280px",
  // minHeight: "300px",
};

/* Pie chart card */
const pieCard = {
  background: "#000000ff",
  padding: "20px",
  borderRadius: "14px",
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // center pie only
};

export default AnalysisCharts;
