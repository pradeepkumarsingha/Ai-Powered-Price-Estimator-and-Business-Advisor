import RecommendationBadge from "../common/RecommendationBadge";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const PredictionResultCard = ({ prediction }) => {
  if (!prediction) {
    return (
      <div className="panel flex min-h-[320px] items-center justify-center p-6 text-center text-slate-400">
        Submit a property profile to see the AI valuation, projected range, and investment advice.
      </div>
    );
  }

  return (
    <div className="panel flex h-full flex-col justify-between p-6 md:p-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Prediction Result</p>
        <p className="mt-6 text-sm text-slate-400">Predicted market value</p>
        <h2 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">
          {currency.format(prediction.predicted_price)} Lakhs
        </h2>

        <div className="mt-6 panel-muted p-5">
          <p className="text-sm text-slate-400">Estimated price range</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {currency.format(prediction.price_range[0])} Lakhs - {currency.format(prediction.price_range[1])} Lakhs
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <div>
          <p className="text-sm text-slate-400">Investment signal</p>
          <p className="text-sm text-slate-500">Based on current location benchmarks</p>
        </div>
        <RecommendationBadge recommendation={prediction.recommendation} />
      </div>
    </div>
  );
};

export default PredictionResultCard;
