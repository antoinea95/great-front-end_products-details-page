import { useMemo, useState } from "react";
import { ProductType } from "./Product.types";
import { formatImages } from "../../utils/products.utils";
import { useNavigate } from "react-router";
import { useGetProductDetailsByColor } from "../../hooks/products.hook";
import { PriceTag } from "../Elements/PriceTag";
import { sectionSubtitle } from "../../utils/tailwindClass";

export const ProductCard = ({ product }: { product: ProductType }) => {
  const [colorToDisplay, setColorToDisplay] = useState(product.colors[0]);
  const { inventoryItem } = useGetProductDetailsByColor(product, colorToDisplay);
  const navigate = useNavigate();

  const coverImg = useMemo(
    () =>
      formatImages(product.images).find(
        (image) => image.color === colorToDisplay
      ),
    [product.images, colorToDisplay]
  );

  if(!inventoryItem) {
    return <p>...loading</p>
  }

  return (
    <section className="group pb-3 rounded-lg hover:bg-neutral-50 transition-all">
      <header className="rounded-lg overflow-hidden w-full h-72 relative flex items-center justify-center group-hover:shadow-md transition-all">
        <img
          src={coverImg?.image_url}
          alt={`Product: ${product.name} in color ${colorToDisplay}`}
          className="object-cover w-full h-full group-hover:scale-110 group-hover:drop-shadow-xl transition-all"
          loading="lazy"
        />
      </header>
      <section className="flex flex-col justify-between gap-4 px-2 pt-4">
        <div className="leading-3">
          <small className="capitalize text-neutral-600">
            {colorToDisplay}
          </small>
          <h2
            className={`${sectionSubtitle} cursor-pointer hover:underline`}
            onClick={() =>
              navigate(
                `/${product.product_id}?color=${colorToDisplay}${
                  product.sizes.length > 0
                    ? `&size=${product.sizes[0].toString()}`
                    : ""
                }&quantity=1`
              )
            }
            role="button"
            tabIndex={0}
            aria-label={`View details of ${product.name}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/${product.product_id}`);
              }
            }}
          >
            {product.name}
          </h2>
        </div>

        <PriceTag
          inventoryItem={inventoryItem}
        />
        <div className="gap-4 flex items-center">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setColorToDisplay(color)}
              className={`w-5 h-5 rounded-full cursor-pointer border flex items-center justify-center ${
                colorToDisplay === color ? "border-neutral-600" : "border-neutral-200"
              }`}
              style={{ backgroundColor: `${color}` }}
              aria-label={`Select color ${color}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setColorToDisplay(color);
                }
              }}
            >
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: `${color}` }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </section>
    </section>
  );
};
