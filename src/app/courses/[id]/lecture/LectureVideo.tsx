"use client";

import { selectCurrentUser } from "@/redux/features/authSlice";
import {
  selectCurrenUserProgress,
  setHasUserProgress,
} from "@/redux/features/globalSlice";
import {
  selectCurrentLecture,
  setLecture,
} from "@/redux/features/lectureSlice";
import { useAllLectures, useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  createUserProgress,
  updateUserProgress,
} from "@/services/user-progress";

import { ArrowRightFromLine } from "lucide-react";
import { toast } from "sonner";

const LectureVideo = () => {
  const currentLecture = useAppSelector(selectCurrentLecture);
  const currentUserProgress = useAppSelector(selectCurrenUserProgress);
  const { data: lectures } = useAllLectures(undefined, undefined, undefined);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const toEmbed = (url: string) => url?.replace("watch?v=", "embed/");

  const nextLecture =
    lectures?.find(
      (lec) =>
        lec?.module?._id === currentLecture?.module?._id &&
        lec?.lectureNumber === currentLecture?.lectureNumber + 1
    ) ||
    lectures?.find(
      (lec) =>
        lec?.module?.moduleNumber ===
          currentLecture?.module?.moduleNumber + 1 && lec?.lectureNumber === 1
    );

  const handleNextButton = async () => {
    const toastId = toast.loading(" Creating... ");

    dispatch(setLecture(nextLecture));

    try {
      const modifiedData = {
        userId: user?._id,
        completedLectures: [currentLecture?._id],
        unlockedLectures: [currentLecture?._id],
      };

      const updatedData = {
        currentLecture: currentLecture?._id,
        nextLecture: nextLecture?._id,
      };

      console.log("updatedData", updatedData);

      let res;

      if (!currentUserProgress || currentUserProgress.userId !== user?._id) {
        res = await createUserProgress(JSON.stringify(modifiedData));
      } else {
        res = await updateUserProgress(updatedData, currentUserProgress?._id);
      }

      dispatch(setHasUserProgress(res?.data));

      console.log("here is the res", res);

      if (res.success) {
        toast.success("Created", { id: toastId });
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err}`, { id: toastId });
    }
  };

  return (
    <div className="lg:w-4/6 w-full mx-auto">
      <div>
        <iframe
          className="w-full h-[350px] lg:h-[600px]"
          src={currentLecture?.videoURL ? toEmbed(currentLecture.videoURL) : ""}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen={true}
        ></iframe>

        <div className="flex justify-end mt-5">
          <button
            onClick={() => handleNextButton()}
            className={`cursor-pointer border border-gray-300
             hover:bg-primary-700/90 py-2 px-6 rounded-[10px] flex 
                      items-center justify-center font-semibold bg-primary-700 text-primary-50`}
          >
            Next <ArrowRightFromLine className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureVideo;
