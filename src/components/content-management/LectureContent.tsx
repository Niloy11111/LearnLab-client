import { getAllLectures } from "@/services/Lecture";
import LectureCrud from "./LectureCrud";

const LectureContent = async ({ query, toggle, moduleId, courseModule }) => {
  //   const { data: lectures, reFetch } = useAllLectures(moduleId);

  const { data: lectures } = await getAllLectures(undefined, undefined, query);

  console.log("LectureContent", query);

  return (
    <div className="bg-white ">
      {moduleId === courseModule?._id &&
        toggle &&
        lectures
          ?.slice()
          .sort((a, b) => a.lectureNumber - b.lectureNumber)
          .map((lecture) => (
            <div
              key={lecture?._id}
              className="border-b mb-3 w-[1240px] mx-auto py-3 flex justify-between"
            >
              <div className="flex items-center gap-4 ">
                <span className="bg-yellow-400 px-2 rounded-full">
                  {lecture?.lectureNumber}
                </span>{" "}
                <h1>{lecture?.lectureTitle}</h1>{" "}
                <span>{lecture?.pdfUrls?.length} PDFs </span>
              </div>

              <LectureCrud lecture={lecture} />
            </div>
          ))}
    </div>
  );
};

export default LectureContent;
