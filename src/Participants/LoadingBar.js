
const LoadingBar = () => {
  return (
    <div className="flex justify-center w-[calc(100vw-80px)] h-screen flex-col items-center">
      <progress className="flex justify-center w-56 progress"></progress>
      <h1 className="text-xl font-medium text-center text-zinc-700">
        Loading...
      </h1>
    </div>
  );
};

export default LoadingBar;


