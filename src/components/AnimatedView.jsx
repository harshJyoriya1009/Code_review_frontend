import { useEffect, useState } from "react";

function AnimatedView({ activeKey, children }) {
  const [displayKey, setDisplayKey] = useState(activeKey);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);

    const timeout = setTimeout(() => {
      setDisplayKey(activeKey);
      setVisible(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [activeKey]);

  return (
    <div
      style={{
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
      }}
    >
      {children(displayKey)}
    </div>
  );
}

export default AnimatedView;
