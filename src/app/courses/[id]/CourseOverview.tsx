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
          Skill Development / Self-Improvment /{" "}
          <span className="font-semibold text-gray-600">Employee Ethics</span>
        </div>
        <h1 className="text-3xl font-bold my-5">{course?.title}</h1>
        <div className="flex justify-between items-center">
          <span className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-1 text-gray-700" />
            Dhaka, Bangladesh
          </span>
          <div className="flex justify-between items-center gap-3">
            <span className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-current" />
              Officially
            </span>
            <span className="text-green-600">Verified Course</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="border border-primary-200 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center gap-4 px-5">
          <div>
            <div className="text-sm text-gray-500">Price</div>
            <div className="font-semibold">
              ${course?.price?.toLocaleString()}
            </div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Modules</div>
            <div className="font-semibold">220</div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Lectures</div>
            <div className="font-semibold">700</div>
          </div>
          <div className="border-l border-gray-300 h-10"></div>
          <div>
            <div className="text-sm text-gray-500">Pdf files</div>
            <div className="font-semibold">1020</div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="my-16">
        <h2 className="text-xl font-semibold mb-5">About {course?.title}</h2>
        <p className="text-gray-500 leading-7">{course?.description}</p>
      </div>
    </div>
  );
};

export default CourseOverview;
