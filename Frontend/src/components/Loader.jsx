const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-400 animate-spin"></div>
      </div>
      <p className="text-gray-400 mt-4 text-sm">{text}</p>
    </div>
  );
};

export default Loader;