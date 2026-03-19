import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const AuthCard = ({ title, subtitle, children, alternateLabel, alternateTo, alternateText }) => {
  return (
    <div className="mx-auto max-w-md">
      <div className="panel p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-brand-500/15 p-3 text-brand-400 ring-1 ring-brand-500/30">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-white">EstateAI</p>
            <p className="text-xs text-slate-400">Secure access to your valuation workspace</p>
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
        <p className="mt-3 text-sm text-slate-400">{subtitle}</p>

        <div className="mt-8">{children}</div>

        <p className="mt-6 text-center text-sm text-slate-400">
          {alternateText}{" "}
          <Link to={alternateTo} className="font-semibold text-brand-400 hover:text-brand-300">
            {alternateLabel}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthCard;
