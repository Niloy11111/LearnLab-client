"use client";

import { Button } from "@/components/ui/button";
import CardTwo from "@/components/ui/CardTwo";
import { useAllProduct } from "@/redux/hook";
import { IProduct } from "@/types";
import Link from "next/link";
import FeaturedPropertiesSkeleton from "./FeaturedPropertiesSkeleton";
const FeaturedProducts = () => {
  const { data: courses, isLoading } = useAllProduct(
    undefined,
    undefined,
    undefined
  );

  return (
    <div className=" bg-opacity-50 py-20 customWidth">
      <div className="">
        <div className="flex items-center  justify-between mb-5">
          <h2 className="font-bold text-2xl">Featured Courses</h2>
          <Link href="/courses">
            <Button variant="outline" className="rounded-full">
              All Collection
            </Button>
          </Link>
        </div>

        <div className="">
          {isLoading ? (
            <div className="min-h-screen grid lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((item, index) => (
                <FeaturedPropertiesSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className=" w-full ">
              <div className="grid 2xl:grid-cols-4 xl:grid-cols-3  md:grid-cols-2  gap-5">
                {courses?.slice(0, 8).map((course: IProduct) => (
                  <CardTwo
                    key={course._id}
                    course={course}
                    courseLink={`/courses/${course._id}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div
            className={`${
              isLoading
                ? "hidden"
                : "w-[190px] rounded py-3.5 flex justify-center items-center bg-secondary-400 mx-auto mt-10"
            }`}
          >
            <Link href="/courses" className="hover:text-white">
              More Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
