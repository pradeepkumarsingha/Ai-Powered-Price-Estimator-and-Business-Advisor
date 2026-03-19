import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchHistory } from "../api/predictions";
import LoadingSpinner from "../components/common/LoadingSpinner";
import RecommendationBadge from "../components/common/RecommendationBadge";
import SectionHeader from "../components/common/SectionHeader";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHistory();
        setHistory(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const filtered = useMemo(() => {
    return history.filter((item) => {
      const text = `${item.location} ${item.furnishing} ${item.recommendation}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [history, search]);

  return (
    <div className="space-y-8">
      <SectionHeader
  eyebrow="History"
  title={
    <span>
      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Track Your Past Predictions
      </span>{" "}
      <span className="text-white">
        with Ease.
      </span>
    </span>
  }
  description="Review your previous property evaluations, compare results, and quickly find insights based on location, furnishing, or investment recommendations."
/>

      <div className="panel p-4">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search history"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>
      </div>

      <div className="panel overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <LoadingSpinner label="Loading prediction history..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/90 text-slate-400">
                <tr>
                  <th className="px-4 py-4 font-medium">Location</th>
                  <th className="px-4 py-4 font-medium">Specs</th>
                  <th className="px-4 py-4 font-medium">Furnishing</th>
                  <th className="px-4 py-4 font-medium">Predicted Price</th>
                  <th className="px-4 py-4 font-medium">Recommendation</th>
                  <th className="px-4 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item._id} className="border-t border-slate-800 text-slate-200">
                    <td className="px-4 py-4">{item.location}</td>
                    <td className="px-4 py-4">
                      {item.area_sqft} sqft | {item.bhk} BHK | {item.bathrooms} bath | {item.parking} parking
                    </td>
                    <td className="px-4 py-4">{item.furnishing}</td>
                    <td className="px-4 py-4">INR {Math.round(item.predicted_price).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-4">
                      <RecommendationBadge recommendation={item.recommendation} />
                    </td>
                    <td className="px-4 py-4">{new Date(item.created_at).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!filtered.length ? (
              <div className="px-4 py-10 text-center text-sm text-slate-400">No prediction records match your search.</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
