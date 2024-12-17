import { useState, useEffect, useRef } from "react";
import { RiCheckLine } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router";
import { handleChangeAndUpdateParamsUrl } from "../../utils/products.utils";
import { ProductInfoSection } from "../Products/ProductInfoSection";

export const SelectColor = ({
  colors,
  stockInThisColor,
}: {
  colors: string[];
  stockInThisColor: Record<string, number>;
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const colorToDisplay = searchParams.get("color");
  const [colorSelected, setColorSelected] = useState(colorToDisplay!);
  const labelRefs = useRef<HTMLLabelElement[]>([]); // Store references to the labels

  const isLightColor = (rgb: string): boolean => {
    const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  useEffect(() => {
    labelRefs.current.forEach((label) => {
      if (label) {
        const backgroundColor = getComputedStyle(label).backgroundColor;
        const isLight = isLightColor(backgroundColor);
        label.style.color = isLight ? "black" : "white";
      }
    });
  }, [colorSelected, colors]);

  return (
    <ProductInfoSection title="Available colors">
      <form className="flex items-center gap-4 lg:gap-8">
        {colors.map((color, index) => (
          <div
            key={color}
            className={` border ${
              color === colorSelected
                ? "border-indigo-700 p-0.5"
                : "border-neutral-300"
            } flex items-center justify-center rounded-full`}
          >
            <label
              htmlFor={color}
              ref={(el) => (labelRefs.current[index] = el!)}
              className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center relative`}
              style={{
                backgroundColor: color,
              }}
            >
              {stockInThisColor[color] === 0 ? (
                <span className="absolute w-0.5 h-10 rotate-45 bg-neutral-600" />
              ) : color === colorSelected ? (
                <RiCheckLine className="text-2xl" />
              ) : null}
            </label>
            <input
              type="radio"
              name="color"
              className="hidden"
              value={color}
              id={color}
              onChange={(e) =>
                handleChangeAndUpdateParamsUrl(
                  e.target.value,
                  setColorSelected,
                  "color",
                  searchParams,
                  navigate
                )
              }
            />
          </div>
        ))}
      </form>
    </ProductInfoSection>
  );
};
