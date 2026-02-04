export function normalizeAnalysisResult(raw) {
  if (!raw || typeof raw !== "object") return null;

  return {
    overall_score: Number(raw.overall_score) || 0,

    summary:
      typeof raw.summary === "string"
        ? raw.summary
        : "No summary provided.",

    issues: Array.isArray(raw.issues)
      ? raw.issues.map(normalizeIssue)
      : [],

    suggestions: Array.isArray(raw.suggestions)
      ? raw.suggestions.map(normalizeSuggestion)
      : [],
  };
}

function normalizeIssue(issue) {
  // String issue
  if (typeof issue === "string") {
    return {
      category: "General",
      description: issue,
    };
  }

  // Object issue
  if (typeof issue === "object" && issue !== null) {
    return {
      category:
        typeof issue.category === "string"
          ? issue.category
          : "General",

      description:
        typeof issue.description === "string"
          ? issue.description
          : JSON.stringify(issue),
    };
  }

  return {
    category: "General",
    description: String(issue),
  };
}

function normalizeSuggestion(suggestion) {
  if (typeof suggestion === "string") {
    return { description: suggestion };
  }

  if (typeof suggestion === "object" && suggestion !== null) {
    return {
      description:
        typeof suggestion.description === "string"
          ? suggestion.description
          : JSON.stringify(suggestion),
    };
  }

  return { description: String(suggestion) };
}
