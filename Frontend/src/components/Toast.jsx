const Toast = ({ message, type = "success" }) => {
  const styles =
    type === "error"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : "border-sky-400/30 bg-sky-400/10 text-sky-200";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${styles}`}>
      {message}
    </div>
  );
};

export default Toast;