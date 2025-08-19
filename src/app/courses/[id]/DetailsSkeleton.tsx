const DetailsSkeleton = () => {
  return (
    <div className="">
      {/* Left section skeleton */}

      <div className="h-[50vh]  w-full  bg-gray-300 dark:bg-[#9FADC2]" />

      <div className="customWidth  flex flex-col md:flex-row justify-center gap-10 mt-16 mb-8 animate-pulse">
        <div className="order-2 md:order-1 w-4/6 space-y-6">
          <div className="h-64 w-full rounded-lg bg-gray-300 dark:bg-[#9FADC2]" />
          <div className="h-32 w-full rounded-lg bg-gray-300 dark:bg-[#9FADC2]" />
          <div className="h-48 w-full rounded-lg bg-gray-300 dark:bg-[#9FADC2]" />
        </div>

        {/* Right section skeleton */}
        <div className="order-1 md:order-2 w-2/6 space-y-6">
          <div className="h-64 w-full rounded-lg bg-gray-300 dark:bg-[#9FADC2]" />
          <div className="h-48 w-full rounded-lg bg-gray-300 dark:bg-[#9FADC2]" />
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
