"use client";
import { Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import LectureList from "./LectureList";

const ModuleAccordion = ({ lectures, courseModules }) => {
  const [currentId, setCurrentId] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentModuleId = searchParams.get("moduleId");
  const handleVisibility = (itemId) => {
    if (itemId === currentId) {
      setCurrentId(null);
    } else {
      setCurrentId(itemId);
    }

    const params = new URLSearchParams(searchParams.toString());
    const isSame = currentModuleId === itemId;
    if (isSame) params.delete("moduleId");
    else params.set("moduleId", itemId);
    router.push(`?${params.toString()}`);
  };

  // const handleShowLectures = (id: string) => {

  // };

  return (
    <div className="my-4">
      <section
        className="h-[700px] overflow-y-auto "
        style={{ scrollbarWidth: "thin" }}
      >
        {courseModules
          ?.sort((a, b) => a.moduleNumber - b.moduleNumber)
          ?.map((courseModule) => (
            <div
              key={courseModule?._id}
              className=" bg-white p-3 rounded-md mb-5 border-b border-primary-300"
            >
              <div
                onClick={() => handleVisibility(courseModule?._id)}
                className="cursor-pointer   flex justify-between "
              >
                <div className="">
                  <h1 className="font-bold text-xl text-primary-800">
                    Module {courseModule?.moduleNumber}:{" "}
                    {courseModule?.moduleTitle}
                  </h1>
                  <p className="text-primary-600 mt-1 mb-2  text-sm">
                    1 hours 3m
                  </p>
                </div>
                <button>
                  {" "}
                  {courseModule?._id === currentId ? <Minus /> : <Plus />}
                </button>
              </div>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ${
                  courseModule?._id === currentId
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="smallDesc text-left pb-5">
                    <LectureList lectures={lectures} />
                  </p>
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default ModuleAccordion;
