"use client";
import { setLecture } from "@/redux/features/lectureSlice";
import { useAppDispatch } from "@/redux/hook";
import { CircleCheck, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const LectureList = ({ lectures }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const handleSetLecture = (lecture) => {
    console.log("here lecture", lecture);
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
        ?.map((lecture) => (
          <div
            key={lecture?._id}
            className=" pt-4 border-b pb-3 border-primary-300"
          >
            <p
              onClick={() => handleSetLecture(lecture)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-[20px] text-secondary-600" />
              <CircleCheck className="w-[20px] text-secondary-600" />{" "}
              {lecture?.lectureNumber} {lecture?.lectureTitle}
            </p>
          </div>
        ))}
    </div>
  );
};

export default LectureList;
