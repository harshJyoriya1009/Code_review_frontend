function Loader() {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #374151",
          borderTop: "4px solid #3b82f6",
          borderRadius: "50%",
          margin: "0 auto",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ marginTop: "10px", color: "#9ca3af" }}>
        Analyzing code…
      </p>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
