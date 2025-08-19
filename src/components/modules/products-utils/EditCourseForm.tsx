// import { AddCourseFormData, AddCourseSchema } from "@/lib/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// import NMImageUploader from "@/components/ui/core/NMImageUploader";
// import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
// import { Form, FormLabel } from "@/components/ui/form";
// import { CustomFormField } from "@/components/ui/form/FormField";
// import { AddCourseFormProps } from "@/types";

// import { Button } from "@/components/ui/button";

// const AddCourseForm = ({ onSubmit }: AddCourseFormProps) => {
//   const [imageFiles, setImageFiles] = useState<File[] | []>([]);
//   const [imagePreview, setImagePreview] = useState<string[] | []>([]);

//   const isSubmitting = false;
//   const form = useForm<AddCourseFormData>({
//     resolver: zodResolver(AddCourseSchema),
//     // defaultValues: {
//     //   title: "",
//     //   description: "",
//     //   price: 0,
//     // },
//   });

//   const handleSubmit = async (data: AddCourseFormData) => {
//     const resetForm = () => {
//       form.reset();
//       setImageFiles([]);
//       setImagePreview([]);
//     };
//     await onSubmit(data, imageFiles, resetForm);
//   };

//   console.log("skdjf");

//   return (
//     <div className="pt-8 pb-5 px-8">
//       <div className="mb-5">
//         <h1 className="text-xl font-semibold">
//           {/* {`${
//             userType
//               ? userType?.charAt(0)?.toUpperCase() + userType?.slice(1)
//               : "User"
//           } Settings`} */}
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage your account preferences and personal information
//         </p>
//       </div>
//       <div className="bg-white rounded-xl p-6">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleSubmit)}
//             className="space-y-6"
//           >
//             <CustomFormField name="title" label="Title" />
//             <CustomFormField
//               name="description"
//               label="Description"
//               type="textarea"
//             />
//             <CustomFormField name="price" label="Price" />

//             <div className="">
//               <FormLabel htmlFor="" className="font-semibold">
//                 Thumbnail
//               </FormLabel>
//               {imagePreview?.length > 0 ? (
//                 <ImagePreviewer
//                   className="max-w-max mt-2"
//                   setImageFiles={setImageFiles}
//                   imagePreview={imagePreview}
//                   setImagePreview={setImagePreview}
//                 />
//               ) : (
//                 <NMImageUploader
//                   className="max-w-max mt-2"
//                   setImageFiles={setImageFiles}
//                   setImagePreview={setImagePreview}
//                   label="Upload Here"
//                 />
//               )}
//             </div>

//             <div className="pt-4 flex justify-between">
//               <div className="flex gap-5">
//                 <Button
//                   type="submit"
//                   className="bg-primary-700 text-white w-full mt-8"
//                 >
//                   {isSubmitting ? "Creating Course....." : "Create Course"}
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddCourseForm;
