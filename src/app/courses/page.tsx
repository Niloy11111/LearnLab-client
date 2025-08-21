import FeaturedPropertiesSkeleton from "@/components/modules/home/FeaturedProducts/FeaturedPropertiesSkeleton";
import Navbar from "@/components/shared/Navbar";
import CardTwo from "@/components/ui/CardTwo";

import { getAllProducts } from "@/services/Product";
import { IProduct } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;

  console.log("real query", query);

  const { data: courses } = await getAllProducts(undefined, undefined, query);

  console.log("courses", courses);
  return (
    <div className="pb-16">
      <Navbar />
      <div className=" flex flex-col customWidth">
        <div>
          <h1 className="text-2xl font-black text-center my-16">All Courses</h1>

          <div>
            {courses?.length === 0 ? (
              <div className="min-h-screen grid 2xl:grid-cols-4 xl:grid-cols-3  md:grid-cols-2  gap-5">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
