import { ImageItem } from "./Product.types";
import { useRef, useState } from "react";

export const ProductCarousel = ({ images }: { images: ImageItem[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    if(!scrollContainerRef.current) return;
    isDragging = true;
    startX = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX; // Distance dragged
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    if(!scrollContainerRef.current) return;

    isDragging = false;
    scrollContainerRef.current.style.cursor = "grab";
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="space-y-8 lg:w-[40%]">
      <div className="rounded-lg overflow-hidden">
        <img
          src={images[activeIndex].image_url}
          className="object-cover w-full h-96 sm:h-[600px]"
        />
      </div>
      <div
        className="overflow-x-auto w-full pt-1 pb-4 pr-4 border-black no-scrollbar"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {images.length > 1 && (
          <div className="flex gap-4 w-fit">
            {images.map((image, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden w-20 sm:w-40 lg:w-28 max-h-40 ${
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
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
