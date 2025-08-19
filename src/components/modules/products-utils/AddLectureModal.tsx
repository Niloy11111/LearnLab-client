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
import { addLecture } from "@/services/Lecture";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddLecture = ({
  isOpen,
  onClose,
  moduleId,
}: {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
}) => {
  const form = useForm();

  // const { data: users } = useAllUsers();

  const {
    formState: { isSubmitting },
  } = form || {};

  const onSubmit: SubmitHandler<LectureFormData> = async (data) => {
    const toastId = toast.loading("Lecture Creating... ");
    const formData = new FormData();

    const modifiedData = {
      ...data,
      module: moduleId,
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
      const res = await addLecture(formData);

      console.log("lecture", res);

      if (res.success) {
        toast.success("Lecture Created", { id: toastId });
        onClose();
        form.reset();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong ${err}`, { id: toastId });
    }
  };

  // console.log("after users", users);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-input">
        <DialogHeader>
          <DialogTitle>Add Lecture</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <CustomFormField name="lectureTitle" label="Lecture Title" />

            <CustomFormField name="videoURL" label="Lecture Video" />
            <div>
              <h2 className="text-lg font-semibold mb-4">PDF Notes</h2>
              <CustomFormField
                name="pdfUrls"
                label="PDF notes"
                type="filePdf"
                accept=".pdf,application/pdf"
              />
            </div>

            <Button type="submit" className="w-full rounded-sm">
              {isSubmitting ? "Adding Lecture...." : "Add Lecture"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLecture;
