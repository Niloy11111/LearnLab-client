"use client";
import CardCompact from "@/components/ui/CardCompact";
import { useAllProduct, useAppSelector, useSingleProduct } from "@/redux/hook";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ContactWidget from "./ContactWidget";
import DetailsSkeleton from "./DetailsSkeleton";
import ImagePreviews from "./ImagePreviews";

import Navbar from "@/components/shared/Navbar";
import { selectCurrentUser } from "@/redux/features/authSlice";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import CourseDetails from "./CourseDetails";
import CourseOverview from "./CourseOverview";

const SingleListing = () => {
  const courseId = useParams().id as string;
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();

  const { data: course, isLoading } = useSingleProduct(courseId as string);
  const { data: courses } = useAllProduct(undefined, undefined, undefined);

  const handleGoLecturePage = () => {
    toast.error("You need to be logged in to access lectures");
    router.push("/login");
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <DetailsSkeleton />
      ) : (
        <div className="">
          <ImagePreviews
            images={[
              "https://www.route1.com/wp-content/uploads/2017/03/banner-tech-offer.jpg",
            ]}
          />

          {/* <ImagePreviews
        images={["/singlelisting-2.jpg", "/singlelisting-3.jpg"]}
      /> */}
          <div className="customWidth flex flex-col md:flex-row justify-center gap-10  mt-16 mb-8">
            <div className="order-2 md:order-1 w-4/6">
              <CourseOverview courseId={courseId} />
              <CourseDetails course={course} />
            </div>

            <div className="order-1 md:order-2 w-full lg:w-2/6">
              <div className="w-full h-64 relative mb-5">
                <Image
                  src="https://media.istockphoto.com/id/1095432950/vector/coaching-word-concepts-banner.jpg?s=2048x2048&w=is&k=20&c=0RU7cjkYB1p_0HoFYhyXlANk6fOX6csWyXGFrsTXtkY="
                  alt={course?.title}
                  fill
                  className="object-cover  rounded-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div>
                {user ? (
                  <Link href={`/courses/${courseId}/lecture`}>
                    <button
                      className={`cursor-pointer bg-white border border-gray-300 text-gray-700 py-3 px-4 mb-5
          rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
                    >
                      Go To Lectures <LogIn className="w-5 h-5 ml-3" />
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handleGoLecturePage}
                    className={`cursor-pointer bg-white border border-gray-300 text-gray-700 py-3 px-4 mb-5
        rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
                  >
                    Go To Lectures <LogIn className="w-5 h-5 ml-3" />
                  </button>
                )}
              </div>

              <ContactWidget />

              <div className="w-full ">
                {" "}
                <h1 className="mt-10 ml-2 font-bold text-2xl ">
                  Some Suggested Courses
                </h1>
                <div className="p-4 w-full grid  grid-cols-1">
                  {courses?.slice(1, 8)?.map((course) => (
                    <CardCompact
                      key={course?._id}
                      course={course}
                      courseLink={`/courses/${course._id}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleListing;
