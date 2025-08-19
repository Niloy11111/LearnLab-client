"use client";
import { deleteCourseModule } from "@/services/CourseModules";
import {
  ChevronDown,
  ChevronRight,
  SquarePen,
  Trash,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AddLecture from "../modules/products-utils/AddLectureModal";
import EditModule from "../modules/products-utils/EditModuleModal";
import { Button } from "../ui/button";
import Modal from "../ui/core/modal/Modal";

const ModuleCard = ({ lectures, courseModule }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const searchParams = useSearchParams();
  const currentModuleId = searchParams.get("moduleId");

  const [openDelete, setOpenDelete] = useState(false);
  // const { data: lectures, reFetch } = useAllLectures(moduleId);

  // const handleButtonClick = () => {
  //   setIsModalOpen(true);

  // };

  const handleShowLectures = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isSame = currentModuleId === id;
    if (isSame) params.delete("moduleId");
    else params.set("moduleId", id);
    router.push(`?${params.toString()}`);
  };

  const handleDeleteModule = async () => {
    const toastId = toast.loading("Module Deleting... ");

    const payload = { isDeleted: "true" };
    try {
      if (courseModule?._id) {
        const res = await deleteCourseModule(payload, courseModule?._id);

        if (res.success) {
          toast.success("Module Deleted", { id: toastId });
          setOpenDelete(false);
        } else {
          toast.error(res.message, { id: toastId });
        }
      }
    } catch (err) {
      toast.error(`Something went wrong ${err}`, { id: toastId });
    }
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  return (
    <>
      <section className="w-[1250px] mx-auto ">
        <div className=" flex justify-between items-center">
          <div>
            <div className="flex items-center font-bold">
              <span className="flex gap-3 items-center">
                {" "}
                <button onClick={() => handleShowLectures(courseModule?._id)}>
                  {" "}
                  {currentModuleId === courseModule._id ? (
                    <ChevronDown className="border rounded-xs w-[30px] h-[30px]" />
                  ) : (
                    <ChevronRight className="border rounded-xs w-[30px] h-[30px]" />
                  )}
                </button>
                Module
              </span>{" "}
              {courseModule?.moduleNumber}: {courseModule?.moduleTitle}{" "}
              <span className="bg-amber-300 rounded-full p-2 text-xs ml-3">
                {/* {courseModules?.length} */}
                {lectures?.length} lectures
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <button
                onClick={() => setOpenEdit(true)}
                className={`cursor-pointer border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex 
                      items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
              >
                <SquarePen className="w-4 h-4 mr-2" />
                Edit Module
              </button>

              <EditModule
                openEdit={openEdit}
                onClose={() => setOpenEdit(false)}
                moduleId={courseModule?._id}
              />
            </div>
            <div>
              <button
                onClick={() => handleOpenDelete()}
                className={`cursor-pointer border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex 
                      items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Module
              </button>

              <div>
                <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                  <div className="text-center ">
                    <Trash size={46} className="mx-auto text-red-500" />
                    <div className="mx-auto my-4 w-[400px]">
                      <h3 className="text-lg font-black text-gray-800">
                        Confirm Delete
                      </h3>
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this Module
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 ">
                      <Button
                        onClick={() => handleDeleteModule()}
                        variant="secondary"
                        className="   bg-gray-100 py-2 rounded  px-7  "
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        className="bg-gray-100    py-2 rounded  px-7  "
                        onClick={() => setOpenDelete(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>

          <div>
            <Button variant="destructive" onClick={() => setIsModalOpen(true)}>
              + Add Lecture
            </Button>
            <AddLecture
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              moduleId={courseModule?._id}
            />
          </div>
        </div>
      </section>

      {/* <LectureContent
        toggle={toggle}
        moduleId={moduleId}
        courseModule={courseModule}
      /> */}
    </>
  );
};

export default ModuleCard;
