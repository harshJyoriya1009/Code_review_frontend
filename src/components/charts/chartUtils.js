export const getIssueCategory = (issue) => {
  const text = (issue.description || issue || "").toLowerCase();

  if (
    text.includes("security") ||
    text.includes("password") ||
    text.includes("crypto") ||
    text.includes("math.random") ||
    text.includes("xss") ||
    text.includes("csrf")
  ) {
    return "Security";
  }

  if (
    text.includes("performance") ||
    text.includes("optimize") ||
    text.includes("slow") ||
    text.includes("loop") ||
    text.includes("inefficient") ||
    text.includes("bottleneck")
  ) {
    return "Performance";
  }

  if (
    text.includes("refactor") ||
    text.includes("readability") ||
    text.includes("maintain") ||
    text.includes("typo") ||
    text.includes("cleanup") ||
    text.includes("console.log") ||
    text.includes("naming") ||
    text.includes("style")
  ) {
    return "Code Quality";
  }

  return "General";
};

export const exportCanvasById = (containerId, filename) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const canvas = container.querySelector("canvas");
  if (!canvas) return;

  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
};
