import { useParams, useSearchParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { ProductCarousel } from "./ProductCarousel";
import { Rating } from "../Elements/Rating";
import { SelectColor } from "../Elements/SelectColor";
import { Sizes } from "../Elements/Sizes";
import { useGetProductDetailsByColor } from "../../hooks/products.hook";
import { ProductType } from "./Product.types";
import { PriceTag } from "../Elements/PriceTag";
import { QuantityModifier } from "../Elements/QuantityModifier";
import { cardTitle } from "../../utils/tailwindClass";

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
    <section className="space-y-12 bg-white px-4 pt-12 rounded-md">
      <ProductCarousel images={images} />
      <section className="space-y-8">
        <h1 className={cardTitle}>
          {product.name}
        </h1>
        <div className="w-fit space-y-2">
          <PriceTag inventoryItem={inventoryItem}  />
         {isDiscount && <span className="font-medium text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-full py-1 px-2 inline-flex">
            {inventoryItem.discount ? `${inventoryItem.discount}$ OFF` : `${inventoryItem.discount_percentage}% OFF`}
          </span>}
          <Rating rating={product.rating} reviews={product.reviews} />
        </div>
        <p>{product.description}</p>
        <SelectColor colors={product.colors} stockInThisColor={stockInThisColor} />
        {stockBySizes && <Sizes sizes={product.sizes} stockBySizes={stockBySizes} />}
        <QuantityModifier stock={stockBySizes ? stockBySizes : stockInThisColor} selectedKey={sizeToDisplay ? sizeToDisplay : colorToDisplay} />
      </section>
    </section>
  );
};
