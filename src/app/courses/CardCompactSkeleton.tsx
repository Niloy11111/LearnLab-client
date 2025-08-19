const CardCompactSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded overflow-hidden shadow-lg w-full flex h-40 mb-5 animate-pulse"
        >
          <div className="relative w-1/3 bg-gray-200" />
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div className="h-5 bg-gray-300 rounded w-1/2 mb-2" />
                <div className="h-5 w-5 bg-gray-300 rounded-full" />
              </div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-2">
                <div className="h-4 w-10 bg-gray-300 rounded" />
                <div className="h-4 w-10 bg-gray-300 rounded" />
                <div className="h-4 w-10 bg-gray-300 rounded" />
              </div>
              <div className="h-6 w-16 bg-gray-300 rounded" />
              <div className="h-5 w-12 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardCompactSkeleton;
