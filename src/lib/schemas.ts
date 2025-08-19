import * as z from "zod";

export const lectureSchema = z.object({
  lectureTitle: z.string().min(1, "Lecture title is required"),
  video: z.string().min(1, "Video url is required"),
  pdfUrls: z
    .array(z.instanceof(File))
    .min(1, "At least one pdf is required")
    .or(z.array(z.string()).nonempty("At least one pdf is required")),
});

export type LectureFormData = z.infer<typeof lectureSchema>;

export const courseModuleSchema = z.object({
  moduleTitle: z.string().min(1, "Module title is required"),
});

export type CourseModuleFormData = z.infer<typeof courseModuleSchema>;

export const AddCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Title is required"),
  price: z.coerce.number().int({ message: "Price must be a number" }),
});

export type AddCourseFormData = z.infer<typeof AddCourseSchema>;
