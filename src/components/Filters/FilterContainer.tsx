import { useState } from "react";
import { RiAddLine, RiStarFill, RiSubtractLine } from "react-icons/ri";

export const FilterContainer = ({
  title,
  items,
  handleCheck,
}: {
  title: string;
  items: { id: string; name: string }[];
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="space-y-4 border-b pb-4">
      <div className="flex items-center justify-between">
        <h4>{title}</h4>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <RiSubtractLine /> : <RiAddLine />}
        </button>
      </div>
      {isOpen && (
        <ul className={`space-y-2 ${title === "Colors" ? "flex items-center gap-2 flex-wrap" : ""}`}>
          {items.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={`${title}-${item.id}`}
                value={item.id}
                onChange={handleCheck}
                className={`${
                  title === "Colors" || title === "Ratings" ? "hidden" : ""
                }`}
              />
              <label
                htmlFor={`${title}-${item.id}`}
                className={`ml-2 cursor-pointer ${
                  title === "Colors"
                    ? "inline-flex w-4 h-4 rounded-full border border-neutral-200"
                    : ""
                }`}
                style={{
                  backgroundColor: title === "Colors" ? item.id : "transparent",
                }}
              >
                {title === "Colors" ? (
                  ""
                ) : title === "Ratings" ? (
                  <span className="inline-flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RiStarFill
                        className={`${
                          Number(item.id) >= index + 1
                            ? "fill-yellow-400"
                            : "fill-gray-200"
                        } text-xl`}
                        key={index}
                      />
                    ))}
                  </span>
                ) : (
                  item.name
                )}
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
