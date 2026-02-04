import { useEffect, useState } from "react";

function StableChartContainer({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // wait for layout to settle
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!ready) return null;

  return (
    <div style={{ width: "100%" }}>
      {children}
    </div>
  );
}

export default StableChartContainer;
