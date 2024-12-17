import { useState } from "react";
import { InfoType } from "./Product.types";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

export const ProductInfo = ({ info }: { info: InfoType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full pt-8 pb-4 border-t first:border-none border-neutral-200 mx-auto space-y-4">
      <h3 className="w-full flex items-center justify-between font-medium">
        {info.title}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border-2 border-neutral-400 text-neutral-400 text-md"
        >
          {isOpen ? <RiSubtractLine strokeWidth={1}/> : <RiAddLine strokeWidth={1} />}
        </button>
      </h3>
      {isOpen && (
        <ul className="list-disc px-8 text-neutral-600 text-sm space-y-2">
          {info.description.map((item, index) => (
            <li key={`${info.title}_${index}`} className="">{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
};
