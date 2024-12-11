import { SizeClothesKey, SizeShoesKey } from "../Products/Product.types";

export const Sizes = ({ sizes }: { sizes: SizeClothesKey[] | SizeShoesKey[] }) => {

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
            <div key={size} className="px-6 py-2 border rounded-lg">
              <label>{typeof size === 'string' ? sizesMap[size] : size}</label>
              <input type="radio" name="size" className="hidden" value={size} />
            </div>
          ))
        }
      </div>
    </section>
  );
};
