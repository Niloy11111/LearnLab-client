import { getAllLectures } from "@/services/Lecture";
import { ICourseModule } from "@/types/course-module";
import LectureContent from "./LectureContent";
import ModuleCard from "./ModuleCard";
const CourseModule = async ({
  courseModule,
  searchParams,
}: {
  courseModule: ICourseModule;
  searchParams: Promise<{ moduleId: string }>;
}) => {
  // const { moduleId } = (await searchParams) || {};

  const query = await searchParams;
  const toggle = query?.moduleId === courseModule?._id;
  const { data: lectures } = await getAllLectures(undefined, undefined, query);

  // console.log('query here', query)

  return (
    <>
      <div className="mt-5 bg-gray-200 p-6 rounded-[10px] ">
        <ModuleCard lectures={lectures} courseModule={courseModule} />

        {/* <section className="w-[1250px] mx-auto ">
          <div className=" flex justify-between items-center">
            <div>
              <div className="flex items-center font-bold">
                <span className="flex gap-3 items-center">
                  {" "}
                  <button onClick={() => handleShowLectures(courseModule?._id)}>
                    {" "}
                    {toggle ? (
                      <ChevronDown className="border rounded-xs w-[30px] h-[30px]" />
                    ) : (
                      <ChevronRight className="border rounded-xs w-[30px] h-[30px]" />
                    )}
                  </button>
                  Module
                </span>{" "}
                {courseModule?.moduleNumber}: {courseModule?.moduleTitle}{" "}
                <span className="bg-amber-300 rounded-full p-2 text-xs ml-3">
  
                  lectures
                </span>
              </div>
            </div>

            <div>
              <Button variant="destructive" onClick={handleButtonClick}>
                + Add Lecture
              </Button>
              <AddLecture
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                moduleId={courseModule?._id}
              />
            </div>
          </div>
        </section> */}
      </div>

      <LectureContent
        query={query}
        toggle={toggle}
        moduleId={courseModule?._id}
        courseModule={courseModule}
      />
    </>
  );
};

export default CourseModule;
