const StatCard = ({ label, value, helper }) => {
  return (
    <div className="panel-muted p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      {helper ? <p className="mt-2 text-sm text-slate-400">{helper}</p> : null}
    </div>
  );
};

export default StatCard;
