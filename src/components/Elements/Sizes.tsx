import { useState } from "react";
import { SizeClothesKey, SizeShoesKey } from "../Products/Product.types";
import { useNavigate, useSearchParams } from "react-router";
import { handleChangeAndUpdateParamsUrl } from "../../utils/products.utils";
import { ProductInfoSection } from "../Products/ProductInfoSection";

export const Sizes = ({
  sizes,
  stockBySizes,
}: {
  sizes: SizeClothesKey[] | SizeShoesKey[];
  stockBySizes: Record<string, number>
}) => {
  const [searchParams] = useSearchParams();
  const [selectedSize, setSelectedSize] = useState<string>(
    searchParams.get("size")!
  );
  const navigate = useNavigate();
  

  const sizesMap: Record<SizeClothesKey, string> = {
    xs: "XS",
    sm: "S",
    md: "M",
    lg: "L",
    xl: "XL",
  };
  return (
    <ProductInfoSection title="Avalaible Sizes">
      <div className="flex items-center gap-4 flex-wrap">
        {sizes.map((size) => (
          <div
            key={size}
            className={`px-6 py-2 border rounded-md ${
              selectedSize === size.toString() ? " border-indigo-700" : ""
            }`}
          >
            <label htmlFor={size.toString()} className="text-lg font-medium">
              {typeof size === "string" ? sizesMap[size] : size}
            </label>
            <input
              type="radio"
              name="size"
              id={size.toString()}
              className="hidden"
              value={size}
              onChange={(e) =>
                handleChangeAndUpdateParamsUrl(
                  e.target.value,
                  setSelectedSize,
                  "size",
                  searchParams,
                  navigate
                )
              }
              disabled={stockBySizes[size.toString()] === 0}
            />
          </div>
        ))}
      </div>
    </ProductInfoSection>
  );
};
