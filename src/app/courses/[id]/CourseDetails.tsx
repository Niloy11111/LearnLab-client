"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProduct } from "@/types";

import Image from "next/image";
import Reviews from "./Reviews";

const CourseDetails = ({ course }: { course: IProduct }) => {
  return (
    <div className="mb-6">
      {/* instructor */}

      <div>
        <h2 className="text-xl font-semibold my-3">Course Instructors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="bg-gray-100  border rounded-xl py-8 px-4  ">
            <Image
              src="/instructor-1.jpg"
              alt="name"
              width={50}
              height={50}
              className="rounded-full mx-auto my-3"
            />
            <h1 className="text-center font-semibold ">Dr. Anisur Rahman</h1>
            <p className="text-center text-primary-600 ">
              <span className="block ">CSE Department </span>
              University of Dhaka
            </p>
          </div>
          <div className="bg-gray-100  border rounded-xl py-8 px-4  ">
            <Image
              src="/instructor-2.jpg"
              alt="name"
              width={50}
              height={50}
              className="rounded-full mx-auto my-3"
            />
            <h1 className="text-center font-semibold ">Dr. James Anderson</h1>
            <p className="text-center text-primary-600 ">
              <span className="block ">CSE Department </span>
              University of Oxford
            </p>
          </div>
          <div className="bg-gray-100  border rounded-xl py-8 px-4  ">
            <Image
              src="/instructor-3.png"
              alt="name"
              width={50}
              height={50}
              className="rounded-full mx-auto my-3"
            />
            <h1 className="text-center font-semibold ">Prof. Emma Brown</h1>
            <p className="text-center text-primary-600 ">
              <span className="block ">CSE Department </span>
              University of Cambridge
            </p>
          </div>
          <div className="bg-gray-100  border rounded-xl py-8 px-4  ">
            <Image
              src="/instructor-4.png"
              alt="name"
              width={50}
              height={50}
              className="rounded-full mx-auto my-3"
            />
            <h1 className="text-center font-semibold ">Mr. David Williams</h1>
            <p className="text-center text-primary-600 ">
              <span className="block ">CSE Department </span>
              University of Edinburgh
            </p>
          </div>
        </div>
      </div>
      {/* Reviews */}
      <div className="mt-12 mb-16">
        <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100">
          Reviews
        </h3>
        <Reviews />
      </div>
      {/* Tabs Section */}
      <div>
        <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100 mb-5">
          Fees and Policies
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-300 mt-2">
          The fees below are based on community-supplied data and may exclude
          additional fees and utilities.
        </p>
        <Tabs defaultValue="required-fees" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="required-fees">Required Fees</TabsTrigger>
            <TabsTrigger value="pets">Duration</TabsTrigger>
            <TabsTrigger value="parking">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="required-fees" className="w-1/3">
            <p className="font-semibold mt-5 mb-2">One time move in fees</p>
            <hr />
            <div className="flex justify-between py-2 ">
              <span className="text-primary-700 font-medium">
                Application Fee
              </span>
              <span className="text-primary-700">${course?.price}</span>
            </div>
            <hr />
            <div className="flex justify-between py-2 ">
              <span className="text-primary-700 font-medium">
                Security Deposit
              </span>
              <span className="text-primary-700">$80</span>
            </div>
            <hr />
          </TabsContent>
          <TabsContent value="pets">
            <p className="font-semibold mt-5 mb-2">
              We are expecting 5-6 months
            </p>
          </TabsContent>
          <TabsContent value="parking">
            <p className="font-semibold mt-5 mb-2">
              Lecture Sheet and Pdf hard copy
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetails;
