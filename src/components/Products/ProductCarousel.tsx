import { ImageItem } from "./Product.types";
import { useState } from "react";

export const ProductCarousel = ({ images }: { images: ImageItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="space-y-8">
      <div className="rounded-lg overflow-hidden h-96 w-full">
        <img
          src={images[activeIndex].image_url}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-8 w-full overflow-x-auto">
       {images.length > 1 && <div className="flex gap-4 w-[110vw]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden ${
                activeIndex === index
                  ? "border-2 border-indigo-700"
                  : "border-2 border-transparent"
              }`}
              role="button"
              aria-label="Click to change photo"
              onClick={() => handleClick(index)}
            >
              <img
                src={image.image_url}
                alt={``}
                className="object-cover w-full h-full max-h-32 max-w-20"
              />
            </div>
          ))}
        </div>}
      </div>
    </section>
  );
};
