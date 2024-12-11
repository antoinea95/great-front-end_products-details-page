import { useParams, useSearchParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { ProductCarousel } from "./ProductCarousel";
import { ProductInfo } from "./ProductInfos";
import { useGetProductDetailsByColor } from "../../hooks/products.hook";
import { ProductType } from "./Product.types";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const colorToDisplay = searchParams.get("color");
  const { data: product, isLoading } = useFetch<ProductType>(`products/${productId}`);
  const {price, images, discount} = useGetProductDetailsByColor(product, colorToDisplay!);

  if (isLoading || !product) {
    return <p>...loading</p>;
  }

  return (
    <section className="space-y-4">
      <ProductCarousel images={images} />
      <ProductInfo product={product} price={price} discount={discount} />
    </section>
  );
};
