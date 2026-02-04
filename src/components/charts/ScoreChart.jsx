import { Bar } from "react-chartjs-2";
import { exportCanvasById } from "./chartUtils";

function ScoreChart({ score }) {
  const color =
    score >= 7 ? "#22c55e" : score >= 4 ? "#facc15" : "#ef4444";

  const data = {
    labels: ["Score"],
    datasets: [{ data: [score], backgroundColor: color, borderRadius: 8 }],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200 },
    plugins: { legend: { display: false } },
    scales: {
      x: { min: 0, max: 10 },
      y: { display: false },
    },
  };

  return (
    <div id="score-chart">
      <div style={{ height: "100px" }}>
        <Bar data={data} options={options} />
      </div>

      <button
        onClick={() => exportCanvasById("score-chart", "score-chart.png")}
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

export default ScoreChart;
