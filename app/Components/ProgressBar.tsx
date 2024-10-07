function ProgressBar({progress, step}: any) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-3/5">
      <div className="mb-1 text-base font-medium dark:text-white">Step {step}/4</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-blue-400 h-2.5 rounded-full dark:bg-blue-500"
          style={{ width: progress }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar