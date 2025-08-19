"use client";
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormLabel } from "@/components/ui/form";

import { CustomFormField } from "@/components/ui/form/FormField";
import { AddCourseFormData, AddCourseSchema } from "@/lib/schemas";
import { useSingleProduct } from "@/redux/hook";
import { updateProduct } from "@/services/Product";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditCourse = ({
  isOpen,
  onClose,
  courseId,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}) => {
  const { data: course, reFetch } = useSingleProduct(courseId);

  const form = useForm<AddCourseFormData>({
    resolver: zodResolver(AddCourseSchema),
    defaultValues: {
      title: course?.title,
      description: course?.description,
      price: course?.price,
    },
  });

  const {
    formState: { isSubmitting },
  } = form || {};

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([
    course?.thumbnail || "",
  ]);

  const handleSubmit = async (data: AddCourseFormData) => {
    const resetForm = () => {
      form.reset();
      setImageFiles([]);
      setImagePreview([]);
    };

    console.log("fulld ata", data);

    const toastId = toast.loading("Course Updating... ");
    const formData = new FormData();

    const modifiedData = {
      ...data,
    };

    formData.append("data", JSON.stringify(modifiedData));
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append("thumbnail", imageFiles[0]);

    try {
      const res = await updateProduct(formData, courseId);

      if (res.success) {
        toast.success("Course updated", { id: toastId });
        onClose();
        resetForm();
        reFetch();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err}`, { id: toastId });
    }
  };

  useEffect(() => {
    if (course) {
      form.reset(course);
      if (course.thumbnail) setImagePreview([course.thumbnail]);
    }
  }, [course]);

  // console.log("after users", users);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-input">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <CustomFormField name="title" label="Title" />
            <CustomFormField
              name="description"
              label="Description"
              type="textarea"
            />
            <CustomFormField name="price" label="Price" />

            <div className="">
              <FormLabel htmlFor="" className="font-semibold">
                Thumbnail
              </FormLabel>
              {imagePreview?.length > 0 ? (
                <ImagePreviewer
                  className="max-w-max mt-2"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              ) : (
                <NMImageUploader
                  className="max-w-max mt-2"
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Here"
                />
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <div className="flex gap-5">
                <Button
                  type="submit"
                  className="bg-primary-700 text-white w-full mt-8"
                >
                  {isSubmitting ? "Updating Course....." : "Create Course"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourse;
