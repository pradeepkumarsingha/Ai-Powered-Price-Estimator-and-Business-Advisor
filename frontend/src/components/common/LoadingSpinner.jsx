const LoadingSpinner = ({ label = "Loading...", fullScreen = false, compact = false }) => {
  const wrapperClass = fullScreen
    ? "flex min-h-[60vh] flex-col items-center justify-center gap-4"
    : "flex items-center gap-3 text-sm text-slate-300";

  const spinnerClass = compact
    ? "h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-brand-500"
    : "h-12 w-12 animate-spin rounded-full border-[3px] border-slate-700 border-t-brand-500";

  return (
    <div className={wrapperClass}>
      <span className={spinnerClass} />
      <span className={fullScreen ? "text-base text-slate-300" : undefined}>{label}</span>
    </div>
  );
};

export default LoadingSpinner;
