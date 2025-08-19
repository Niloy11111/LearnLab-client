"use client";
import AddCourseForm from "@/components/modules/products-utils/AddCourseForm";
import { AddCourseFormData } from "@/lib/schemas";
import { addProduct } from "@/services/Product";
import { toast } from "sonner";

const AddProductPage = () => {
  const handleSubmit = async (
    data: AddCourseFormData,
    imageFiles: File[],
    resetForm: () => void
  ) => {
    const toastId = toast.loading("Course Creating... ");
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append("thumbnail", imageFiles[0]);

    try {
      const res = await addProduct(formData);

      console.log("here ress", res);

      if (res.success) {
        toast.success("Course Created", { id: toastId });
        resetForm();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err}`, { id: toastId });
    }
  };

  return (
    <div className="">
      <AddCourseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProductPage;
