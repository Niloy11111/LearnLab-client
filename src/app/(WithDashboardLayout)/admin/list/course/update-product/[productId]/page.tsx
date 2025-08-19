import UpdateProductForm from "@/components/modules/shop/product/UpdateProductForm";
import { getSingleProduct } from "@/services/Product";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);
  // console.log("kjsdf", product);

  return (
    // flex justify-center items-center
    <div className="">
      <UpdateProductForm product={product} />
    </div>
  );
};

export default UpdateProductPage;
