const ChartCard = ({ title, children, action }) => {
  return (
    <div className="panel p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="h-80">{children}</div>
    </div>
  );
};

export default ChartCard;
