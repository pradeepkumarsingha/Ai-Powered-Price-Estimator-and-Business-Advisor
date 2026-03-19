const themeMap = {
  "Good Deal": "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30",
  Overpriced: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30"
};

const RecommendationBadge = ({ recommendation }) => {
  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
        themeMap[recommendation] || "bg-slate-700/60 text-slate-200"
      }`}
    >
      {recommendation}
    </span>
  );
};

export default RecommendationBadge;
