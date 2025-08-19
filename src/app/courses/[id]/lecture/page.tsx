import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import { getAllCourseModules } from "@/services/CourseModules";
import { getAllLectures } from "@/services/Lecture";
import { Search } from "lucide-react";
import LectureVideo from "./LectureVideo";
import ModuleAccordion from "./ModuleAccordion";

const LecturePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ moduleId: string }>;
}) => {
  const query = await searchParams;
  const { id } = await params;
  const lectureNumber = query?.lectureNumber;
  const lectureTitle = query?.lectureTitle;

  const { data: lectures } = await getAllLectures(undefined, undefined, query);

  const { data: courseModules } = await getAllCourseModules(id);

  console.log("courseModules k", courseModules);

  return (
    <div>
      <Navbar />

      <section className="customWidth">
        <h1 className="pt-4 pb-3 border-b border-primary-300">
          Lecture {lectureNumber}: {lectureTitle}
        </h1>

        <div className="flex gap-10 mt-4">
          <LectureVideo />

          <div className="w-2/6  min-h-screen">
            <div className="flex justify-between">
              <p>Running Module 81</p> <p>Progress bar</p>
            </div>
            <div className="flex justify-center my-3 mb-8">
              <Input
                type="text"
                placeholder="Search by Lessons"
                className="w-full border border-primary-300 rounded-[10px]  bg-white h-12"
              />

              <Search className="-ml-10 mt-2" />
            </div>
            <ModuleAccordion
              lectures={lectures}
              courseModules={courseModules}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LecturePage;
