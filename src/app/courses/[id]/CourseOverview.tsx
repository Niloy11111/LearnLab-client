"use client";

import { useSingleProduct } from "@/redux/hook";

import { MapPin, Star } from "lucide-react";

const CourseOverview = ({ courseId }: { courseId: string }) => {
  const { data: course } = useSingleProduct(courseId);

  console.log("co", courseId);

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">
          Education / Online Learning /{" "}
          <span className="font-semibold text-gray-600">Course Design</span>
        </div>
        <h1 className="text-3xl font-bold my-5">{course?.title}</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <span className="flex items-center text-gray-500 text-xs sm:text-sm">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 mr-1 text-gray-700" />
            Dhaka, Bangladesh
          </span>
          <div className="flex justify-between items-center gap-2 sm:gap-3">
            <span className="flex items-center text-yellow-500 text-xs sm:text-sm">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 mr-1 fill-current" />
              Officially
            </span>
            <span className="text-green-600 text-xs sm:text-sm">
              Verified Course
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="w-[350px] sm:w-[500px]  border border-primary-200 rounded-xl  p-3 sm:p-6 mb-6">
        <div className="grid grid-cols-2 sm:flex sm:justify-between sm:items-center gap-4 px-2 sm:px-5">
          <div className="text-center sm:text-left">
            <div className="text-sm text-gray-500">Price</div>
            <div className="font-semibold">
              ${course?.price?.toLocaleString()}
            </div>
          </div>
          <div className="hidden sm:block border-l border-gray-300 h-10"></div>
          <div className="text-center sm:text-left">
            <div className="text-sm text-gray-500">Modules</div>
            <div className="font-semibold">220</div>
          </div>
          <div className="hidden sm:block border-l border-gray-300 h-10"></div>
          <div className="text-center sm:text-left">
            <div className="text-sm text-gray-500">Lectures</div>
            <div className="font-semibold">700</div>
          </div>
          <div className="hidden sm:block border-l border-gray-300 h-10"></div>
          <div className="text-center sm:text-left">
            <div className="text-sm text-gray-500">Pdf files</div>
            <div className="font-semibold">1020</div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="my-16 d:w-full w-[360px]">
        <h2 className="text-xl font-semibold mb-5  ">About {course?.title}</h2>
        <p className="text-gray-500 leading-7">{course?.description}</p>
      </div>
    </div>
  );
};

export default CourseOverview;
