import { useMemo, useState } from "react";
import { ProductType } from "./Product.types";
import { formatImages } from "../../utils/productsimages.utils";
import { useNavigate } from "react-router";

export const ProductCard = ({ product }: { product: ProductType }) => {
  const [colorToDisplay, setColorToDisplay] = useState(product.colors[0]);
  const navigate = useNavigate();

  const coverImg = useMemo(
    () =>
      formatImages(product.images).find(
        (image) => image.color === colorToDisplay
      ),
    [product.images, colorToDisplay]
  );

  const priceByColor = useMemo(() => {
    const result = product.inventory.find(
      (item) => item.color === colorToDisplay
    );

    if (result) {
      const isDiscount =
        result.discount !== null || result.discount_percentage !== null;
      if (isDiscount) {
        return { sale: result.sale_price, list: result.list_price };
      }
      return { list: result.list_price };
    }
    return {};
  }, [product.inventory, colorToDisplay]);

  return (
    <section className="group pb-3 rounded-lg hover:bg-gray-50 transition-all">
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
          <p className="capitalize text-xs font-light text-gray-400">
            {colorToDisplay}
          </p>
          <h2
            className="text-lg cursor-pointer underline lg:no-underline hover:underline transition-all"
            onClick={() => navigate(`/${product.product_id}`)}
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

        {priceByColor.sale ? (
          <p className="text-lg text-gray-400 font-light flex items-center gap-2">
            ${priceByColor.sale}{" "}
            <span className="text-xs line-through">${priceByColor.list}</span>
          </p>
        ) : (
          <p className="text-lg text-gray-400 font-light">
            ${priceByColor.list}
          </p>
        )}
        <div className="gap-2 flex items-center">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setColorToDisplay(color)}
              className={`w-5 h-5 rounded-full cursor-pointer border flex items-center justify-center ${
                colorToDisplay === color ? " border-black" : ""
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
