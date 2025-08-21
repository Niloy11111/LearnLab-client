"use server";
import { getValidToken } from "@/lib/verifyTokent";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  // console.log("from ", query?.priceRange);

  console.log("also", query);

  if (query?.priceRange) {
    const [min, max] = (query?.priceRange as string).split(",");
    params.append("minPrice", min);
    params.append("maxPrice", max);
  }
  if (query?.squareFeet) {
    const [min, max] = (query?.squareFeet as string).split(",");
    params.append("minSquareFeet", min);
    params.append("maxSquareFeet", max);
  }
  if (query?.location) {
    params.append("location", query?.location.toString());
  }
  if (query?.beds) {
    params.append("beds", query?.beds.toString());
  }
  if (query?.baths) {
    params.append("baths", query?.baths.toString());
  }
  if (query?.propertyType) {
    params.append("propertyType", query?.propertyType.toString());
  }
  if (query?.amenities) {
    params.append("amenities", query?.amenities.toString());
  }
  if (query?.squareFeet) {
    params.append("squareFeet", query?.squareFeet.toString());
  }

  console.log(process.env.NEXT_PUBLIC_BASE_API);

  try {
    console.log("Before fetching data");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );

    const data = await res.json();
    // console.log("After fetching data", data);
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
export const getSingleProduct = async (productId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add product
export const addProduct = async (productData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      method: "POST",
      body: productData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updateProduct = async (
  productData: FormData,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "PATCH",
        body: productData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteProduct = async (productId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
