import CourseCard from "@/components/content-management/CourseCard";
import CourseModules from "@/components/content-management/CourseModules";
import { getAllCourseModules } from "@/services/CourseModules";

const ContentManagement = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ moduleId: string }>;
}) => {
  const { id } = await params;
  console.log("here", id);

  const { data: courseModules } = await getAllCourseModules(id);

  return (
    <div className="mb-16">
      <h1 className="text-center font-bold my-10 text-2xl">
        Content Management
      </h1>
      {/* All Modules list related to course */}
      <CourseCard />

      <CourseModules
        courseModules={courseModules}
        searchParams={searchParams}
      />
    </div>
  );
};

export default ContentManagement;
