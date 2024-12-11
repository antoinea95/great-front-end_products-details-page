import { PriceTag } from "../Elements/PriceTag";
import { ProductType } from "./Product.types";
import { Discount } from "../Elements/Discount";
import { Rating } from "../Elements/Rating";
import { SelectColor } from "../Elements/SelectColor";
import { Sizes } from "../Elements/Sizes";

export const ProductInfo = ({
  product,
  price,
  discount,
}: {
  product: ProductType;
  price: { sale?: number; list?: number } | null;
  discount: string | null;
}) => {

  return (
    <section className="space-y-4">
      <h1 className="text-2xl lg:text-3xl font-medium text-neutral-900">{product.name}</h1>
      <div className="w-fit space-y-2">
        <PriceTag
          price={price}
          mainPriceSet="text-3xl text-neutral-600"
          littlePriceSet="text-base font-light text-neutral-500"
        />
        <Discount discount={discount} />
        <Rating rating={product.rating} reviews={product.reviews}/>
      </div>
      <p className="text-neutral-600">{product.description}</p>
      <SelectColor colors={product.colors} />
      {product.sizes.length > 0 && <Sizes sizes={product.sizes} />}
    </section>
  );
};
