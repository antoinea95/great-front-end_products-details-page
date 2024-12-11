import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { PaginationType, ProductType } from "./Product.types";
import { ProductCard } from "./ProductCard";
import { useLocation} from "react-router";

export const ProductsGrid = ({
  params,
}: {
  params?: Record<string, string>;
}) => {
  const {pathname} = useLocation();
  const { data: products, isLoading } = useFetch<{data: ProductType[], pagination: PaginationType}>("products", params);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (products?.data) {
      const imageUrls = products.data.flatMap((product: ProductType) =>
        product.images.map((img) => img.image_url)
      );

      const preloadImages = async () => {
        await Promise.all(
          imageUrls.map(
            (url: string) =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = resolve;
              })
          )
        );
        setImagesLoaded(true);
      };

      preloadImages();
    }
  }, [products]);

  if (isLoading || !imagesLoaded) {
    return <p>...loading</p>;
  }

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl text-neutral-900">{pathname === "/latest" ? "Latest Arrivals" : "All products"}</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 w-fit max-w-full mx-auto py-8">
        {products.data.map((product: ProductType) => (
          <ProductCard product={product} key={product.product_id} />
        ))}
      </section>
    </div>
  );
};
