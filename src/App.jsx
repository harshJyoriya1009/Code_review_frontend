import { useState, useEffect } from "react";
import AnalysisResult from "./components/AnalysisResult";
import AnalysisCharts from "./components/AnalysisCharts";
import Loader from "./components/Loader";
import SuccessBanner from "./components/SuccessBanner";
import ViewTabs from "./components/ViewTabs";
import AnimatedView from "./components/AnimatedView";
import { normalizeAnalysisResult } from "./utils/normalizeAnalysis";
// import logo from "./assets/logo.png";
import favicon from "./assets/favicon.svg"

function App() {
  const [repo, setRepo] = useState("");
  const [filePath, setFilePath] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  
    //  ANALYZE HANDLER
  const handleAnalyze = async () => {
    if (!repo || !filePath) {
      setError("Please enter both repo and file path");
      return;
    }

    setLoading(true);
    setError(null);
    setShowSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/api/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo_path: repo,
          file: filePath,
        }),
      });

      const text = await response.text();
      if (!response.ok) throw new Error(text);

      const parsed = JSON.parse(text);
      const normalized = normalizeAnalysisResult(parsed);

      setResult(normalized);
      setActiveTab("overview");
      setShowSuccess(true);

      localStorage.setItem(
        "analysisResult",
        JSON.stringify(normalized)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to analyze code. Check backend or AI agent.");
    } finally {
      setLoading(false);
    }
  };

  
    //  RESTORE LAST ANALYSIS
    useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (!stored) return;

    try {
      const parsed = normalizeAnalysisResult(JSON.parse(stored));
      setResult(parsed);
    } catch {
      localStorage.removeItem("analysisResult");
    }
  }, []);

  
    //  AUTO-HIDE SUCCESS BANNER
    useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  
    //  UI
    return (
    
    <div style={pageStyle}>
      <img
    src={favicon}
    alt="AI Code Review Logo"
    style={logoStyle}
  />
      {/* <div style={{ maxWidth: "700px" }}> */}
  <h1>AI Code Review Agent</h1>
  <p>--Analyze a file directly from a GitHub repository--</p>

  <input
    placeholder="GitHub Repo (e.g. user/repo)"
    value={repo}
    onChange={(e) => setRepo(e.target.value)}
    style={inputStyle}
  />

  <input
    placeholder="File path (e.g. src/app.js)"
    value={filePath}
    onChange={(e) => setFilePath(e.target.value)}
    style={inputStyle}
  />

  <button
    onClick={handleAnalyze}
    disabled={loading}
    style={{
      ...analyzeBtn,
      opacity: loading ? 0.6 : 1,
      cursor: loading ? "not-allowed" : "pointer",
    }}
  >
    {loading ? "Analyzing…" : "Analyze Code"}
  </button>
{/* </div> */}

    
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {loading && <Loader />}
      {showSuccess && <SuccessBanner />}

    
         {/* TABS + ANIMATED CONTENT */}
    
      {result && !loading && (
        <>
          <ViewTabs
            activeView={activeTab}
            setActiveView={setActiveTab}
          />

          <AnimatedView activeKey={activeTab}>
            {(key) => {
              if (key === "overview") {
                return <AnalysisResult result={result} />;
              }

              if (key === "charts") {
                return <AnalysisCharts result={result} />;
              }

              if (key === "suggestions") {
                return (
                  <AnalysisResult
                    result={{ ...result, summary: "" }}
                    showOnlySuggestions
                  />
                );
              }

              return null;
            }}
          </AnimatedView>
        </>
      )}
    </div>
  );
}


  //  STYLES

const pageStyle = {
  padding: "30px",
  fontFamily: "Arial",
  color: "white",
  background: "#000000ff",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
   alignItems: "center",
};


const inputStyle = {
  display: "block",
  marginBottom: "10px",
 width: "100%",       
  maxWidth: "600px",
  padding: "10px",
  background: "#2a2a2a",
  border: "1px solid #444",
  color: "white",
  borderRadius: "6px",
};

const analyzeBtn = {
  padding: "10px 20px",
  marginBottom: "20px",
  borderRadius: "8px",
  background: "#111",
  color: "white",
  border: "1px solid #333",
};
const logoStyle = {
  width: "70px",
  height: "70px",
  marginBottom: "12px",
  objectFit: "contain",
};


export default App;

