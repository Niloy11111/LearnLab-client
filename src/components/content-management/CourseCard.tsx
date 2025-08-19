"use client";

import { useSingleProduct } from "@/redux/hook";
import { useParams } from "next/navigation";
import { useState } from "react";
import AddModule from "../modules/products-utils/AddModuleModal";
import { Button } from "../ui/button";

const CourseCard = () => {
  const courseId = useParams().id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: course } = useSingleProduct(courseId);

  console.log("course", course);

  const handleButtonClick = () => {
    setIsModalOpen(true);
    //   setSelectedUser(user);
  };
  return (
    <div className="bg-white flex justify-between items-center p-6 rounded-[10px]">
      <div>
        <h1 className="font-black text-2xl">{course?.title}</h1>
        <p>Manage modules and lectures</p>
      </div>

      <div>
        <Button onClick={handleButtonClick}>+Add Module</Button>
        <AddModule
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseId={courseId}
        />
      </div>
    </div>
  );
};

export default CourseCard;
