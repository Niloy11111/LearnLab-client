"use client";
import CardCompact from "@/components/ui/CardCompact";
import { useAllProduct, useSingleProduct } from "@/redux/hook";
import Image from "next/image";
import { useParams } from "next/navigation";
import ContactWidget from "./ContactWidget";
import DetailsSkeleton from "./DetailsSkeleton";
import ImagePreviews from "./ImagePreviews";

import CourseDetails from "./CourseDetails";
import CourseOverview from "./CourseOverview";

const SingleListing = () => {
  const courseId = useParams().id as string;

  const { data: course, isLoading } = useSingleProduct(courseId as string);
  const { data: courses } = useAllProduct(undefined, undefined, undefined);

  return (
    <>
      {isLoading ? (
        <DetailsSkeleton />
      ) : (
        <div>
          <ImagePreviews
            images={[
              "https://blog.fastlearner.ai/wp-content/uploads/2024/09/images-01-scaled.webp",
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

            <div className="order-1 md:order-2 w-2/6">
              <div className="w-full h-64 relative mb-5">
                <Image
                  src="https://media.istockphoto.com/id/1095432950/vector/coaching-word-concepts-banner.jpg?s=2048x2048&w=is&k=20&c=0RU7cjkYB1p_0HoFYhyXlANk6fOX6csWyXGFrsTXtkY="
                  alt={course?.title}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <ContactWidget />

              <div className="w-full ">
                {" "}
                <h1 className="mt-10 font-bold text-2xl ">
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
