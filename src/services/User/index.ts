"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get single product
export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["USER"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getSingleUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["USER"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update product
export const updateUserProfile = async (
  profileData: FormData
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/edit-profile`,
      {
        method: "PATCH",
        body: profileData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag("USER");
    const result = await res.json();
    // console.log("new result", result);

    // if update is successful, set new tokens
    if (result.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result?.data?.accessToken);
      cookieStore.set("refreshToken", result?.data?.refreshToken);
      revalidateTag("USER");
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updateUserStatus = async (
  userData: { updatedRole?: string; isDeleted?: string },
  userId: string
): Promise<any> => {
  try {
    // console.log("userData", userData);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag("USER");
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
