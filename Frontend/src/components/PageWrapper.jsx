const PageWrapper = ({ title, subtitle, children, action }) => {
  return (
    <div className="app-bg min-h-screen text-white px-6 py-10">
      <div className="floating-orb top-10 left-10 h-40 w-40 bg-sky-400/30"></div>
      <div className="floating-orb bottom-10 right-10 h-52 w-52 bg-cyan-300/20"></div>

      <div className="max-w-7xl mx-auto relative z-10 fade-up">
        {(title || subtitle || action) && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              {title && <h1 className="text-3xl md:text-4xl font-bold glow-text">{title}</h1>}
              {subtitle && <p className="text-gray-400 mt-2 text-sm md:text-base">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;