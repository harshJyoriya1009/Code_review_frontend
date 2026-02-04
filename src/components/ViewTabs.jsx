function ViewTabs({ activeView, setActiveView }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📄" },
    { id: "charts", label: "Charts", icon: "📊" },
    { id: "suggestions", label: "Suggestions", icon: "💡" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginTop: "30px",
        marginBottom: "20px",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveView(tab.id)}
          style={{
            padding: "10px 16px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            background:
              activeView === tab.id
                ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                : "#1f2937",
            color: "white",
            boxShadow:
              activeView === tab.id
                ? "0 0 12px rgba(37,99,235,0.6)"
                : "none",
          }}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}

export default ViewTabs;
