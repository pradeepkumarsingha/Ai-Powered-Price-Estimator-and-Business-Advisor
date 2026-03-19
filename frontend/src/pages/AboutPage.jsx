
import SectionHeader from "../components/common/SectionHeader";

const AboutPage = () => {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="About The Product"
         title={
    <span>
      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Smart Property Insights
      </span>{" "}
      <span className="text-white">
         for Better Decisions.
      </span>
    </span>
  }
        description="This platform helps users estimate property prices, understand market trends, and make smarter real estate investment decisions using intelligent predictions."
      />

      <div className="grid gap-6 lg:grid-cols-3">

        {/* PREDICTION */}
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-white">Accurate Price Prediction</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Get an instant estimate of property prices based on key inputs like area, number of rooms, location, and furnishing.
            The system analyzes multiple factors to give a realistic price instead of a rough guess.
          </p>
        </div>

        {/* PRICE RANGE */}
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-white">Price Range Estimation</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Instead of a single number, the platform provides a price range to reflect real market uncertainty. 
            This helps users understand the expected variation and make safer decisions.
          </p>
        </div>

        {/* INVESTMENT */}
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-white">Investment Recommendation</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            The system compares predicted prices with market trends and suggests whether a property is a good deal or overpriced,
            helping users make confident investment choices.
          </p>
        </div>

        {/* LOCATION INSIGHT */}
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-white">Location-Based Insights</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Understand how different locations impact property prices. 
            The platform highlights variations across areas, helping users identify high-value or affordable regions.
          </p>
        </div>

        {/* ANALYTICS */}
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-white">Interactive Analytics</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Visual dashboards provide insights such as price distribution, trends, and comparisons.
            These charts make it easier to understand the real estate market at a glance.
          </p>
        </div>

        {/* USER VALUE */}
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-white">Built for Smart Decisions</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Whether you're buying, selling, or just exploring, this platform simplifies complex data into clear insights,
            enabling faster and smarter real estate decisions.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;