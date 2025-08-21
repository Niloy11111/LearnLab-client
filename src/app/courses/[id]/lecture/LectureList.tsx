"use client";
import { setLecture } from "@/redux/features/lectureSlice";
import { useAllCourseModules, useAppDispatch } from "@/redux/hook";
import { CircleCheck, Lock } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
const LectureList = ({ lectures }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // const currentModuleId = searchParams.get("moduleId");
  const courseId = useParams().id as string;
  const { data: modules } = useAllCourseModules(courseId);
  // const user = useAppSelector(selectCurrentUser);
  // const { data: usersProgres } = useAllUserProgress(undefined);

  const firstModule = modules?.sort(
    (a, b) => a.moduleNumber - b.moduleNumber
  )[0];

  const firstLecture = lectures
    ?.filter(
      (lecture) =>
        (lecture?.module?._id ?? lecture?.module) === firstModule?._id
    )
    .sort((a, b) => a.lectureNumber - b.lectureNumber)[0];

  const firstLectureId = firstLecture?._id;

  const handleSetLecture = (lecture) => {
    if (lecture?._id !== firstLectureId) {
      toast.error("You need to completed previous lecture");
      return;
    }
    dispatch(setLecture(lecture));

    const params = new URLSearchParams(searchParams.toString());
    params.set("lectureNumber", lecture.lectureNumber);
    params.set("lectureTitle", lecture.lectureTitle);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {lectures
        ?.sort((a, b) => a.lectureNumber - b.lectureNumber)
        ?.map((lecture) => {
          return (
            <div
              key={lecture._id}
              className="pt-4 flex justify-between items-center border-b hover:bg-gray-100  pb-3 border-primary-300"
            >
              <button
                onClick={() => handleSetLecture(lecture)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {lecture._id === firstLectureId ? (
                  <CircleCheck className="w-[20px] text-secondary-600" />
                ) : (
                  <Lock className="w-[20px] text-secondary-600" />
                )}
                {lecture.lectureNumber} {lecture.lectureTitle}
              </button>

              <div>
                {lecture?.pdfUrls?.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="text-sm cursor-pointer hover:font-semibold">
                      Pdf Download {index + 1}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LectureList;
