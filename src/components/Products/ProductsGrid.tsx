import { useFetch } from "../../hooks/useFetch";
import { ProductType } from "./Product.types";
import { ProductCard } from "./ProductCard";

export const ProductsGrid = () => {
  const { data: products, isLoading } = useFetch("products");

  if (isLoading) {
    return <p>...loading</p>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 w-fit max-w-full mx-auto">
      {products.data.map((product: ProductType) => (
        <ProductCard product={product} key={product.product_id} />
      ))}
    </section>
  );
};
