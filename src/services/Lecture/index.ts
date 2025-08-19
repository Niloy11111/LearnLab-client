"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// add product
export const addLecture = async (lectureData: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lecture/create-lecture`,
      {
        method: "POST",
        body: lectureData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("LECTURE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllLectures = async (
  page?: string,
  limit?: string,
  query?: {
    [key: string]: string | string[] | undefined;
  }
) => {
  const params = new URLSearchParams();

  if (query?.moduleId) {
    params.append("moduleId", query?.moduleId.toString());
  }

  if (query?.moduleTitle) {
    params.append("moduleTitle", query?.moduleTitle.toString());
  }
  if (query?.courseTitle) {
    params.append("courseTitle", query?.courseTitle.toString());
  }

  // console.log("from ", query?.priceRange);

  try {
    console.log("Before fetching data");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lecture?${params}`,
      {
        next: {
          tags: ["LECTURE"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateLecture = async (
  lectureData: FormData,
  lectureId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lecture/${lectureId}`,
      {
        method: "PATCH",
        body: lectureData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("LECTURE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteLecture = async (
  payload: { isDeleted: string },
  lectureId: string
): Promise<any> => {
  try {
    console.log("from services", lectureId);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/lecture/${lectureId}/delete`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("LECTURE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
