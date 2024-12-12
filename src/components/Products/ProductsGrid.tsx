import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { PaginationType, ProductType } from "./Product.types";
import { ProductCard } from "./ProductCard";
import { useLocation} from "react-router";
import { sectionTitle } from "../../utils/tailwindClass";

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
    <section className="bg-white px-4 pt-12 lg:pt-12 space-y-8 rounded-md">
      <div className="flex justify-between items-center">
       <h1 className={sectionTitle}>{pathname === "/latest" ? "Latest Arrivals" : "All products"}</h1>
        <button className="shadow-md border border-neutral-200 text-neutral-600 rounded-md px-4 py-2">View all</button>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 w-fit max-w-full mx-auto">
        {products.data.map((product: ProductType) => (
          <ProductCard product={product} key={product.product_id} />
        ))}
      </section>
    </section>
  );
};
