import { useState } from "react";
import toast from "react-hot-toast";
import { createPrediction } from "../api/predictions";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SectionHeader from "../components/common/SectionHeader";
import PredictionForm from "../components/prediction/PredictionForm";
import PredictionResultCard from "../components/prediction/PredictionResultCard";
import usePredictionForm from "../hooks/usePredictionForm";

const PredictionPage = () => {
  const { formData, handleChange } = usePredictionForm();
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await createPrediction(formData);
      setPrediction(result);
      toast.success("Prediction generated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Prediction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Prediction Studio"
         title={
    <span>
    
      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Run a property</span>{"  "}
      <span className="text-white/90 font-semibold">valuation in seconds.</span>
    </span>
  }
        description="Analyze property value based on key features like area, configuration, and location. Get a precise estimate along with a price range and actionable investment insights."
      />

      {isLoading ? (
        <div className="panel p-4">
          <LoadingSpinner label="Calling backend and ML service..." />
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <PredictionForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} isLoading={isLoading} />
        <PredictionResultCard prediction={prediction} />
      </div>
    </div>
  );
};

export default PredictionPage;
