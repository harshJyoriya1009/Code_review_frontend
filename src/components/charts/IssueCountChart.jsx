import { Bar } from "react-chartjs-2";
import { exportCanvasById } from "./chartUtils";

function IssueCountChart({ count }) {
  const color =
    count <= 2 ? "#22c55e" : count <= 5 ? "#facc15" : "#ef4444";

  const max = Math.ceil((count + 3) / 5) * 5 || 5;

  const data = {
    labels: ["Issues"],
    datasets: [{ data: [count], backgroundColor: color, borderRadius: 8 }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200 },
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max, ticks: { stepSize: 1 } },
      x: { display: false },
    },
  };

  return (
    <div id="issue-count-chart">
      <div style={{ height: "140px" }}>
        <Bar data={data} options={options} />
      </div>

      <button
        onClick={() =>
          exportCanvasById("issue-count-chart", "issues-chart.png")
        }
        style={btnStyle}
      >
        Download
      </button>
    </div>
  );
}

const btnStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  cursor: "pointer",
  background: "#111827",
  color: "white",
  borderRadius: "6px",
  border: "none",
};

export default IssueCountChart;
