"use server";

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { getSingleUser } from "../User";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    revalidateTag("USER");
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const changePassword = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    const { data } = await getSingleUser();
    // console.log("here", decodedData);
    decodedData.phoneNumber = data?.phoneNumber;
    // decodedData.photo = data?.photo;
    decodedData.name = data?.name;
    // console.log("here", decodedData);
    // console.log("ksdjf", decodedData);
    return decodedData;
  } else {
    return null;
  }
};

// getCurrentUser().then((res) => console.log(res));
// export const getUpdatedUser = async () => {
//   const accessToken = (await cookies()).get("accessToken")?.value;
//   let decodedData = null;

//   if (accessToken) {
//     decodedData = await jwtDecode(accessToken);
//     const { data } = await getSingleUser();
//     console.log("new user result", data);
//     decodedData.phoneNumber = data?.phoneNumber;
//     // decodedData.photo = data?.photo;
//     decodedData.name = data?.name;
//     return decodedData;
//   } else {
//     return null;
//   }
// };

export const reCaptchaTokenVerification = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
        response: token,
      }),
    });

    return res.json();
  } catch (err: any) {
    return Error(err);
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
