"use server";

import { ICourseModule } from "@/types/course-module";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createCourseModule = async (moduleData: any): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/module/create-module`,
      {
        method: "POST",
        body: moduleData,
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("MODULE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCourseModules = async (courseId: string) => {
  const params = new URLSearchParams();

  // console.log("from ", query?.priceRange);

  try {
    console.log("Before fetching data");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/module/${courseId}`,
      {
        next: {
          tags: ["MODULE"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateCourseModule = async (
  payload: Partial<ICourseModule>,
  moduleId: string
): Promise<any> => {
  try {
    console.log("from services", moduleId);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/module/${moduleId}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("MODULE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCourseModule = async (
  payload: { isDeleted: string },
  moduleId: string
): Promise<any> => {
  try {
    console.log("from services", moduleId);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/module/${moduleId}/delete`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("MODULE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
