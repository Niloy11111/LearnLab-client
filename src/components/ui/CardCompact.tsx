import { Component, FileText, Heart, School, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardCompact = ({
  course,
  showFavoriteButton = true,
  courseLink,
}: Record<string, any>) => {
  return (
    <div className="bg-white rounded overflow-hidden shadow-lg w-full flex h-40 mb-5">
      <div className="relative w-1/3">
        <Image
          src={course?.thumbnail}
          alt={course.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-2 left-2 flex gap-1 flex-col">
          {course.isPetsAllowed && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full w-fit">
              Pets
            </span>
          )}
          {course.isParkingIncluded && (
            <span className="bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">
              Parking
            </span>
          )}
        </div>
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold mb-1">{course?.title}</h2>
            {showFavoriteButton && (
              <button className="bg-white rounded-full p-1">
                <Heart className={`w-4 h-4 "text-red-500 fill-red-500`} />
              </button>
            )}
          </div>

          <p className="text-gray-600 mb-1 text-sm ">Lecturer: Adrian Samuel</p>
          <div className="flex text-sm items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="font-semibold">3</span>
            <span className="text-gray-600 ml-1">4</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-2 text-gray-600">
            <span className="flex items-center">
              <School className="w-4 h-4 mr-1" />
            </span>
            <span className="flex items-center">
              <Component className="w-4 h-4 mr-1" />
            </span>
            <span className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
            </span>
          </div>

          <Link href={courseLink} className="" scroll={false}>
            <button
              className="cursor-pointer
           rounded  hover:text-primary underline font-semibold"
            >
              Details
            </button>
          </Link>

          <p className="text-base font-bold">
            ${course.price?.toFixed(0)}
            <span className="text-gray-600 text-xs font-normal"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardCompact;
