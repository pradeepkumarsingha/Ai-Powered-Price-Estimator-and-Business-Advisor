import { BarChart3, Building2, Github, History, Home, Info, Linkedin, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/predict", label: "Predict", icon: Sparkles },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/history", label: "History", icon: History },
  { to: "/about", label: "About", icon: Info }
];

const footerLinks = [
  { label: "GitHub", icon: Github, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" }
];

const AppShell = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-500/15 p-3 text-brand-400 ring-1 ring-brand-500/30">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white">EstateAI</p>
              <p className="text-xs text-slate-400">Real Estate Intelligence Platform</p>
            </div>
          </NavLink>

          <button
            type="button"
            className="rounded-xl border border-slate-800 p-2 text-slate-200 md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {open ? (
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 pb-4 sm:px-6 md:hidden">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-2xl px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-white text-slate-950"
                      : "bg-slate-900/60 text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>

    <footer className="mt-12 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur">
  <div className="mx-auto max-w-7xl px-6 py-10">
    
    {/* TOP SECTION */}
    <div className="grid gap-8 md:grid-cols-3">
      
      {/* BRAND */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          AI Property Advisor
        </h2>
        <p className="mt-3 text-sm text-slate-400 leading-6">
          Get accurate property price estimates, explore market trends, and make smarter real estate decisions with confidence.
        </p>
      </div>

      {/* NAVIGATION */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Navigation
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-400">
          <li><a href="/predict" className="hover:text-white transition">Predict</a></li>
          <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
          <li><a href="/history" className="hover:text-white transition">History</a></li>
          <li><a href="/about" className="hover:text-white transition">About</a></li>
        </ul>
      </div>

      {/* FEATURES */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Features
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-slate-400">
          <li>Price Prediction</li>
          <li>Market Insights</li>
          <li>Investment Guidance</li>
          <li>Analytics Dashboard</li>
        </ul>
      </div>
    </div>

    {/* DIVIDER */}
    <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      
      {/* COPYRIGHT */}
      <p className="text-xs text-slate-500">
        © {new Date().getFullYear()} AI Property Advisor. All rights reserved.
      </p>

      {/* EXTRA LINKS */}
      <div className="flex gap-4 text-xs text-slate-500">
        <span className="hover:text-white cursor-pointer transition">Privacy</span>
        <span className="hover:text-white cursor-pointer transition">Terms</span>
        <span className="hover:text-white cursor-pointer transition">Contact</span>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default AppShell;
