import {
  BarChart3,
  Building2,
  History,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  UserPlus,
  X
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../utils/logo.png";

const links = [
  { to: "/", label: "Home", icon: Home, public: true },
  { to: "/predict", label: "Predict", icon: Sparkles, public: false },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3, public: false },
  { to: "/history", label: "History", icon: History, public: false },
  { to: "/about", label: "About", icon: Info, public: true }
];



const AppShell = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const visibleLinks = links.filter((link) => link.public || isAuthenticated);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex items-center">
            <img 
              src={logo} 
              alt="EstateAI Logo" 
              className="className=h-12 md:h-16 lg:h-20 w-auto-object-contain"
            />
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

          <div className="hidden items-center gap-3 md:flex">
            <nav className="flex items-center gap-2">
              {visibleLinks.map(({ to, label, icon: Icon }) => (
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

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
                  {user?.name}
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500">
                  <LogIn className="h-4 w-4" />
                  Login
                </NavLink>
                <NavLink to="/register" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                  <UserPlus className="h-4 w-4" />
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {open ? (
          <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 md:hidden">
            <nav className="flex flex-col gap-2">
              {visibleLinks.map(({ to, label, icon: Icon }) => (
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

            <div className="mt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <div className="rounded-2xl bg-slate-900/60 px-4 py-3 text-sm text-slate-300">Signed in as {user?.name}</div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm font-semibold text-white">
                    <LogIn className="h-4 w-4" />
                    Login
                  </NavLink>
                  <NavLink to="/register" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
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
