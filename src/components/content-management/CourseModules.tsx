import CourseModule from "./CourseModule";

const CourseModules = ({ courseModules, searchParams }) => {
  return (
    <div className=" ">
      {courseModules
        ?.slice()
        .sort((a, b) => a.moduleNumber - b.moduleNumber)
        .map((courseModule) => (
          <CourseModule
            key={courseModule?._id}
            courseModule={courseModule}
            searchParams={searchParams}
          />
        ))}
    </div>
  );
};

export default CourseModules;

// const courseId = useParams().id as string;
// const { data: courseModules } = useAllCourseModules(courseId);
