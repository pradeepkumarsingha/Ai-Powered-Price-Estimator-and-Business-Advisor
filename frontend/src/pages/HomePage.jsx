import { ArrowRight, BarChart3, DatabaseZap, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import HeroScene from "../components/home/HeroScene";

const highlights = [
  { label: "Model-backed valuation", value: "Instant pricing" },
  { label: "Investment signal", value: "Deal or overpriced" },
  { label: "Operational layer", value: "History and insights" }
];

const features = [
  {
    title: "Real-time valuation",
    description: "Clean prediction flow backed by your trained model.",
    icon: Sparkles
  },
  {
    title: "Market analytics",
    description: "Track pricing patterns by location and area.",
    icon: BarChart3
  },
  {
    title: "Decision memory",
    description: "Every prediction is saved for comparison and review.",
    icon: DatabaseZap
  },
  {
    title: "Production-ready UX",
    description: "Modern interface designed like a real SaaS product.",
    icon: ShieldCheck
  }
];

const HomePage = () => {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="panel px-6 py-8 md:px-10 md:py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Real Estate Price & Investment Advisor
          </div>

         <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
         Smart property valuation
          </span>{" "}
     <span className="text-white">
        with investment context.
      </span>
    </h1>

          <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            Predict price, inspect range, and understand deal quality in one streamlined workflow.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/predict"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Start Prediction
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
            >
              View Dashboard
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroScene />
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ title, description, icon: Icon }) => (
          <div key={title} className="panel p-6">
            <div className="inline-flex rounded-2xl bg-brand-500/15 p-3 text-brand-400 ring-1 ring-brand-500/30">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
