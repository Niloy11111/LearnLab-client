import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/ui/form/FormField";
import { LectureFormData } from "@/lib/schemas";
import { updateLecture } from "@/services/Lecture";
import { ILecture } from "@/types/lecture";
import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const EditLecture = ({
  isOpen,
  onClose,
  lecture,
}: {
  isOpen: boolean;
  onClose: () => void;
  lecture: ILecture;
}) => {
  const form = useForm();

  // const { data: users } = useAllUsers();

  const {
    formState: { isSubmitting },
  } = form || {};

  const onSubmit: SubmitHandler<LectureFormData> = async (data) => {
    const toastId = toast.loading("Lecture updating... ");
    const formData = new FormData();

    const modifiedData = {
      ...data,
    };

    formData.append("data", JSON.stringify(modifiedData));

    Object.entries(data).forEach(([key, value]) => {
      if (key === "pdfUrls") {
        const files = value as File[];
        files.forEach((file: File) => {
          formData.append("pdfs", file);
        });
      } else if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    // Send the formData
    try {
      const res = await updateLecture(formData, lecture?._id);

      console.log("lecture res", res);

      if (res.success) {
        toast.success("Lecture updated", { id: toastId });
        onClose();
        form.reset();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong ${err}`, { id: toastId });
    }
  };

  useEffect(() => {
    if (lecture) {
      form.reset(lecture);
      // if (lecture.thumbnail) setImagePreview([lecture.thumbnail]);
    }
  }, [lecture]);

  // console.log("after users", users);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-input">
        <DialogHeader>
          <DialogTitle>Edit Lecture</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <CustomFormField
              className=""
              type="text"
              name="lectureTitle"
              label="Lecture Title"
            />

            <CustomFormField name="videoURL" label="Lecture Video" />
            <div className="bg">
              {/* <h2 className=" font-semibold ">PDF Notes</h2> */}
              <CustomFormField
                className=""
                name="pdfUrls"
                label="PDF Notes"
                type="filePdf"
                accept=".pdf,application/pdf"
              />
            </div>
            {lecture?.pdfUrls?.length > 0 && (
              <div className="mb-7 -mt-6">
                <p className="text-sm font-medium ">Current PDFs:</p>
                {lecture.pdfUrls.map((pdf, idx) => (
                  <a
                    key={idx}
                    href={pdf}
                    className="underline mb-1 text-primary-700 block"
                  >
                    Pdf-{idx + 1}
                  </a>
                ))}
              </div>
            )}
            <Button type="submit" className="w-full rounded-sm">
              {isSubmitting ? "Updating Lecture...." : "Update Lecture"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLecture;
