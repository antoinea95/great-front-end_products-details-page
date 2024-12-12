import { useState } from "react";
import { SizeClothesKey, SizeShoesKey } from "../Products/Product.types";
import { useSearchParams } from "react-router";
import { handleChangeAndUpdateParamsUrl } from "../../utils/products.utils";

export const Sizes = ({
  sizes,
  stockBySizes,
}: {
  sizes: SizeClothesKey[] | SizeShoesKey[];
  stockBySizes: Record<string, number>
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSize, setSelectedSize] = useState<string>(
    searchParams.get("size")!
  );
  

  const sizesMap: Record<SizeClothesKey, string> = {
    xs: "XS",
    sm: "S",
    md: "M",
    lg: "L",
    xl: "XL",
  };
  return (
    <section className="space-y-4">
      <h3 className="text-neutral-500">Avalaible Sizes</h3>
      <div className="flex items-center gap-4 flex-wrap">
        {sizes.map((size) => (
          <div
            key={size}
            className={`px-6 py-2 border rounded-md ${
              selectedSize === size.toString() ? " border-indigo-700" : ""
            }`}
          >
            <label htmlFor={size.toString()}>
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
                  e,
                  setSelectedSize,
                  "size",
                  setSearchParams,
                  searchParams
                )
              }
              disabled={stockBySizes[size.toString()] === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
