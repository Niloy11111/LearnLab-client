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
