import SuggestionItem from "./SuggestionItem";
function AnalysisResult({ result, showOnlySuggestions = false }) {
  if (!result) return null;

  const score = result.overall_score ?? 0;
  const scoreColor =
    score >= 7 ? "#16a34a" : score >= 4 ? "#f59e0b" : "#dc2626";

  return (
    <div style={{ marginTop: "20px" }}>
      {!showOnlySuggestions && (
        <>
          <span
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              background: scoreColor,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Overall Score: {score}/10
          </span>

          <h3 style={{ marginTop: "20px" }}>📊Summary</h3>
          <p style={{ maxWidth: "800px", lineHeight: "1.6" }}>
            {result.summary}
          </p>
        </>
      )}

      <h3 style={{ marginTop: "30px" }}>🚨Issues Found</h3>
      <ul>
        {(result.issues || []).map((issue, i) => (
          <li key={i} style={{ marginBottom: "8px" }}>
            <strong>[{issue.category || "General"}]</strong>{" "}
            {issue.description}
          </li>
        ))}
      </ul>

      {showOnlySuggestions && (
        <>
          <h3>💡Suggestions</h3>
            {result.suggestions.map((s, index) => (
              <SuggestionItem
                key={index}
                title={`🛠️Suggestion #${index + 1}`}
                description={s.description}
              />
            ))}
        </>
      )}
    </div>
  );
}

const detailsStyle = {
  background: "#1f2937",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
};

export default AnalysisResult;
