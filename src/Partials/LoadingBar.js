import { Oval } from "react-loader-spinner";

const LoadingBar = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
      <Oval
        height={80}
        width={80}
        color="#3b82f6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#e7e5e4"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default LoadingBar;
