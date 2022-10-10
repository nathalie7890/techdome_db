const LoadingBar = () => {
    return (
        <div className="flex justify-center pt-48">
          <div>
            <progress className="w-56 progress"></progress>
            <h1 className="text-xl font-medium text-center text-zinc-700">
              Loading...
            </h1>
          </div>
        </div>
    )
}

export default LoadingBar
