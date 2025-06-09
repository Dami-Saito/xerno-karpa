const FancySpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-20">
      <div className="flex space-x-1">
        <div className="w-2.5 h-2.5 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 bg-fuchsia-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default FancySpinner;
