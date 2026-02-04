import { color } from "chart.js/helpers";
import { useState } from "react";

function SuggestionItem({ title, description }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={container}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        style={header}
      >
        <span>{title}</span>

        <span
          style={{
            ...arrow,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          ▶
        </span>
      </button>

      {/* Animated body */}
      <div
        style={{
          ...body,
          maxHeight: open ? "300px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p style={text}>{description}</p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  background: "#1f2124ff",
  borderRadius: "10px",
  marginBottom: "12px",
  overflow: "hidden",
  color:"white",
  fontSize:"bold"
};

const header = {
  width: "100%",
  padding: "14px 18px",
  background: "transparent",
  color: "white",
  border: "none",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "15px",
  cursor: "pointer",
};

const arrow = {
  transition: "transform 0.30s ease",
};

const body = {
  overflow: "hidden",
  transition: "all 0.3s ease",
};

const text = {
  padding: "14px 18px",
  color: "#d1d5db",
  fontSize: "14px",
  lineHeight: 1.2,
};

export default SuggestionItem;
