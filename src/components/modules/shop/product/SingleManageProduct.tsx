"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/core/modal/Modal";
import { deleteProduct } from "@/services/Product";
import { SquarePen, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import EditCourse from "../../products-utils/EditCourseModal";

const SingleManageProduct = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteOrder = async () => {
    const toastId = toast.loading("Course Deleting... ");
    try {
      if (product?._id) {
        const payload = { isDeleted: "true" };
        const res = await deleteProduct(payload, product?._id);
        console.log("hskdfds", res);
        if (res.success) {
          toast.success("Course Deleted", { id: toastId });
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
    <div className="border rounded-lg p-3">
      <Link
        href={`/admin/content-management/${product._id}`}
        className=""
        scroll={false}
      >
        <div key={product?._id} className="">
          <Image
            src={product?.thumbnail}
            width={500}
            height={500}
            alt="product image"
            className="rounded-sm h-48 object-cover"
          />
          <div className="flex justify-between items-center">
            <h1 className="mt-2 text-xl font-bold">{product?.title}</h1>
            <p>${product?.price}</p>
          </div>
          <p className="mt-2">{product?.description}</p>
        </div>
      </Link>
      <div className="flex justify-between my-2">
        <button
          onClick={() => handleButtonClick()}
          className={`cursor-pointer border border-gray-300
             text-gray-700 py-2 px-4 rounded-md flex 
                      items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
        >
          <SquarePen className="w-4 h-4 mr-2" />
          Edit Course
        </button>

        <EditCourse
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseId={product?._id}
        />

        <button
          onClick={() => handleOpenDelete()}
          className={`cursor-pointer border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex 
                      items-center justify-center font-semibold hover:bg-primary-700 hover:text-primary-50`}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Course
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
                  Are you sure you want to delete this Course
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
    </div>
  );
};

export default SingleManageProduct;
