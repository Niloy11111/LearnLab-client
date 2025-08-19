"use client";

import { IProduct } from "@/types";
import DiscountModal from "./DiscountModal";
import SingleManageProduct from "./SingleManageProduct";

const ManageProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="bg-white px-6 py-3 min-h-screen rounded mt-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Courses Overview</h2>
          <p className="text-sm text-gray-500">Manage and view all courses.</p>
        </div>
        <div className="flex items-center gap-2">
          <DiscountModal />
        </div>
      </div>

      <hr className=" border-t border-input" />
      <div className="grid gap-5 grid-cols-4  my-5">
        {products?.map((product: IProduct) => (
          <SingleManageProduct key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
