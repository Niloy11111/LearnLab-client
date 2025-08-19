const FeaturedPropertiesSkeleton = () => {
  return (
    <div className="bg-white border p-3 rounded overflow-hidden shadow-lg w-full mb-5 animate-pulse">
      <div className="relative">
        <div className="w-full h-64 bg-gray-200 rounded" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div className="h-6 w-20 bg-gray-300 rounded-full" />
          <div className="h-6 w-24 bg-gray-300 rounded-full" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 bg-gray-300 rounded w-1/2" />
          <div className="h-10 w-20 bg-gray-300 rounded" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 bg-gray-300 rounded w-1/3" />
          <div className="h-5 bg-gray-300 rounded w-20" />
        </div>
        <hr />
        <div className="flex justify-between items-center gap-4 text-gray-600 mt-5">
          <div className="h-5 bg-gray-300 rounded w-20" />
          <div className="h-5 bg-gray-300 rounded w-20" />
          <div className="h-5 bg-gray-300 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertiesSkeleton;
