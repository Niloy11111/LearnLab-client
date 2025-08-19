"use client";

import { deleteLecture } from "@/services/Lecture";
import { SquarePen, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EditLecture from "../modules/products-utils/EdidLectureModal";
import { Button } from "../ui/button";
import Modal from "../ui/core/modal/Modal";

const LectureCrud = ({ lecture }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteOrder = async () => {
    const toastId = toast.loading("Lecture Deleting... ");
    try {
      if (lecture?._id) {
        const payload = { isDeleted: "true" };
        const res = await deleteLecture(payload, lecture?._id);
        // console.log("res from nowsdf", res);
        if (res.success) {
          toast.success("Lecture Deleted", { id: toastId });
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
    <div className="flex  my-2">
      <button
        onClick={() => handleButtonClick()}
        className={`cursor-pointer border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex 
                      items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
      >
        <SquarePen className="w-4 h-4 mr-2" />
        Edit Lecture
      </button>

      <EditLecture
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lecture={lecture}
      />

      <button
        onClick={() => handleOpenDelete()}
        className={`ml-5 cursor-pointer border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex 
                      items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Lecture
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
                Are you sure you want to delete this Lecture
              </p>
            </div>
            <div className="flex justify-center gap-4 ">
              <Button
                onClick={() => handleDeleteOrder()}
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
  );
};

export default LectureCrud;
