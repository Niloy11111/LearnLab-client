"use client";

import { selectCurrentLecture } from "@/redux/features/lectureSlice";
import { useAppSelector } from "@/redux/hook";

const LectureVideo = () => {
  const currentLecture = useAppSelector(selectCurrentLecture);
  const toEmbed = (url: string) => url?.replace("watch?v=", "embed/");
  return (
    <div className="w-4/6 ">
      <div>
        <iframe
          className="w-full h-[600px]"
          src={currentLecture?.videoURL ? toEmbed(currentLecture.videoURL) : ""}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default LectureVideo;
