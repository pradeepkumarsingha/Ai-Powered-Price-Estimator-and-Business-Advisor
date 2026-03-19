import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { fetchInsights } from "../api/predictions";
import ChartCard from "../components/dashboard/ChartCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";

const palette = ["#0ea5e9", "#38bdf8", "#fb7185", "#f97316", "#22c55e", "#a855f7"];

const DashboardPage = () => {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setIsLoading(true);
        const data = await fetchInsights();
        setInsights(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard insights");
      } finally {
        setIsLoading(false);
      }
    };

    loadInsights();
  }, []);

  if (isLoading) {
    return (
      <div className="panel p-6">
        <LoadingSpinner label="Loading dashboard insights..." />
      </div>
    );
  }

  if (error) {
    return <div className="panel p-6 text-rose-300">{error}</div>;
  }

  return (
    <div className="space-y-8">
     <SectionHeader
  eyebrow="Analytics"
  title={
    <span>
      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Understand Market Trends
      </span>{" "}
      <span className="text-white">
        at a Glance.
      </span>
    </span>
  }
  description="Explore property trends, compare locations, and gain insights from your past predictions to make smarter real estate decisions."
/>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total Predictions"
          value={insights.summary.totalPredictions}
          helper="Saved from backend prediction requests"
        />
        <StatCard
          label="Average Price"
          value={`INR ${Math.round(insights.summary.averagePrice || 0).toLocaleString("en-IN")} Lakhs`} 
          helper="Across all stored predictions"
        />
        <StatCard
          label="Average Area"
          value={`${Math.round(insights.summary.averageArea || 0).toLocaleString("en-IN")} sqft`}
          helper="Typical size in saved requests"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Price vs Area">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid stroke="#1e293b" />
              <XAxis dataKey="area" stroke="#94a3b8" name="Area" unit=" sqft" />
              <YAxis dataKey="price" stroke="#94a3b8" name="Price" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={insights.priceVsArea} fill="#0ea5e9" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Average Price by Location">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={insights.averagePriceByLocation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="location" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="averagePrice" radius={[10, 10, 0, 0]}>
                {insights.averagePriceByLocation.map((entry, index) => (
                  <Cell key={entry.location} fill={palette[index % palette.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Prediction Volume Timeline">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={insights.predictionTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="predictions" stroke="#38bdf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Feature Importance">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={insights.featureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} />
              <Tooltip />
              <Bar dataKey="importance" fill="#f97316" radius={[0, 10, 10, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardPage;
