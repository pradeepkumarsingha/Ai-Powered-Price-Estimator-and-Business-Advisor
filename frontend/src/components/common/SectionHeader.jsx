const SectionHeader = ({ eyebrow, title, description, action }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h1>
        {description ? <p className="mt-4 text-base text-slate-300 md:text-lg">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
};

export default SectionHeader;
