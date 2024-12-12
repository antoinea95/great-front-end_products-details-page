import { useParams, useSearchParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { ProductCarousel } from "./ProductCarousel";
import { Rating } from "../Elements/Rating";
import { SelectColor } from "../Elements/SelectColor";
import { Sizes } from "../Elements/Sizes";
import { useGetProductDetailsByColor } from "../../hooks/products.hook";
import { ProductType } from "./Product.types";
import { PriceTag } from "../Elements/PriceTag";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const colorToDisplay = searchParams.get("color");
  const sizeToDisplay = searchParams.get("size");
  const { data: product, isLoading } = useFetch<ProductType>(
    `products/${productId}`
  );
  const { images, inventoryItem, stockInThisColor, stockBySizes} = useGetProductDetailsByColor(
    product,
    colorToDisplay!,
    sizeToDisplay
  );


  if (isLoading || !product || !inventoryItem) {
    return <p>...loading</p>;
  }

  const isDiscount = inventoryItem.discount || inventoryItem.discount_percentage;

  return (
    <section className="space-y-4">
      <ProductCarousel images={images} />
      <section className="space-y-4">
        <h1 className="text-2xl lg:text-3xl font-medium text-neutral-900">
          {product.name}
        </h1>
        <div className="w-fit space-y-2">
          <PriceTag inventoryItem={inventoryItem}  />
         {isDiscount && <p className="bg-amber-50 border border-amber-200 text-amber-700 w-fit py-1 px-4 rounded-full">
            {inventoryItem.discount ? `${inventoryItem.discount}$ OFF` : `${inventoryItem.discount_percentage}% OFF`}
          </p>}
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>
        <p className="text-neutral-600">{product.description}</p>
        <SelectColor colors={product.colors} stockInThisColor={stockInThisColor} />
        {stockBySizes && <Sizes sizes={product.sizes} stockBySizes={stockBySizes} />}
      </section>
    </section>
  );
};
