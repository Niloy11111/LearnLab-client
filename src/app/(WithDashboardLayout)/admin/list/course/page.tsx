import ManageProducts from "@/components/modules/shop/product/ManageProducts";
import { getAllProducts } from "@/services/Product";

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data } = await getAllProducts(page, "6");

  // console.log("here sdf", meta);
  return (
    <div>
      <ManageProducts products={data} />
    </div>
  );
};

export default ManageProductsPage;
