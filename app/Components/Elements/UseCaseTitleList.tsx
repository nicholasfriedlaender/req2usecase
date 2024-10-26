function UseCaseTitleList({ useCaseDescriptions, onTitleClick }: any) {
  console.log("UseCase Descriptions Title Page: ", useCaseDescriptions);
  return (
    <div className="text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
      {useCaseDescriptions.map((useCase: any, index: any) => (
        <button
          key={index}
          type="button"
          onClick={() => onTitleClick(useCase)}
          className={`w-full px-4 py-2 text-gray-700 font-medium text-left rtl:text-right ${
            index < useCaseDescriptions.length - 1
              ? "border-b border-gray-200"
              : ""
          } cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:text-blue-700 focus:bg-gray-100`}
        >
          {useCase.title}
        </button>
      ))}
    </div>
  );
}

export default UseCaseTitleList;
