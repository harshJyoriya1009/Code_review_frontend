import { Pie } from "react-chartjs-2";
import { getIssueCategory, exportCanvasById } from "./chartUtils";

function IssueCategoryPie({ issues }) {
  const counts = issues.reduce((acc, issue) => {
    const category = getIssueCategory(issue);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(counts),
    datasets: [
      {
        data: Object.values(counts),
        backgroundColor: [
          "#ef4444",
          "#3b82f6",
          "#facc15",
          "#22c55e",
        ],
      },
    ],
  };

  return (
    <div
      id="pie-chart-container"
      style={{
        background: "#000000ff",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        maxWidth: "420px",
      }}
    >
      {/* <h4>Issues by Category</h4> */}
      <Pie data={data}
       style={{
    maxWidth: "300px",
    margin: "0 auto"
         }}  //-------------------------------------------------
       />

      <button
        onClick={() =>
          exportCanvasById("pie-chart-container", "issues-by-category.png")
        }
        style={{
          marginTop: "10px",
          padding: "6px 12px",
          cursor: "pointer",
          background: "#111827",
          color: "white",
          borderRadius: "6px",
          border: "none",
        }}
      >
        Download
      </button>
    </div>
  );
}

export default IssueCategoryPie;

