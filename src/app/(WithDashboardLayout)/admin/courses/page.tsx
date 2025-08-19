import ManageProducts from "@/components/modules/shop/product/ManageProducts";
import { getAllProducts } from "@/services/Product";

const Page = async () => {
  const { data } = await getAllProducts(undefined, undefined, undefined);

  console.log("todo", data);
  return (
    <div>
      <ManageProducts products={data} />
    </div>
  );
};

export default Page;
