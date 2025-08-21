"use server";

import { IUserProgressUpdate } from "@/types/userProgress";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createUserProgress = async (userProgressData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user-progress/create`,
      {
        method: "POST",
        body: userProgressData,
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PROGRESS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllUserProgress = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();

  if (query?.userId) {
    params.append("userId", query?.userId.toString());
  }

  try {
    console.log("Before fetching data");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user-progress?${params}`,
      {
        next: {
          tags: ["PROGRESS"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateUserProgress = async (
  payload: Partial<IUserProgressUpdate>,
  progressId: string
): Promise<any> => {
  try {
    console.log("from services", progressId);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user-progress/${progressId}/update`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PROGRESS");
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
    revalidateTag("PROGRESS");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
