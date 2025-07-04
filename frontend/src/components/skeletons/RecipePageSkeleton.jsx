const RecipePageSkeleton = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>

      <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
      <ul className="list-disc pl-5 mb-4">
        <li className="h-5 bg-gray-300 rounded w-full mb-2"></li>
        <li className="h-5 bg-gray-300 rounded w-5/6 mb-2"></li>
        <li className="h-5 bg-gray-300 rounded w-3/4 mb-2"></li>
      </ul>

      <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="h-20 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export default RecipePageSkeleton;
