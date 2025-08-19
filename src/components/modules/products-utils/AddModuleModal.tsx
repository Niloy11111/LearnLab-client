"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseModuleFormData } from "@/lib/schemas";
import { useAllCourseModules } from "@/redux/hook";
import { createCourseModule } from "@/services/CourseModules";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddModule = ({
  isOpen,
  onClose,
  courseId,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}) => {
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form || {};

  const { reFetch } = useAllCourseModules(courseId);

  const onSubmit = async (data: CourseModuleFormData) => {
    const toastId = toast.loading(" Creating... ");

    // Send the Data
    try {
      const modifiedData = {
        ...data,
        course: courseId,
      };
      const res = await createCourseModule(JSON.stringify(modifiedData));

      if (res.success) {
        toast.success(" Created", { id: toastId });
        onClose();
        reFetch();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong : ${err}`, { id: toastId });
    }
  };

  // console.log("after users", users);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-input">
        <DialogHeader>
          <DialogTitle>Add a Module</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="moduleTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-6">Module Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Module Title"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-sm">
              {isSubmitting ? "Creating Module...." : "Create Module"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModule;
