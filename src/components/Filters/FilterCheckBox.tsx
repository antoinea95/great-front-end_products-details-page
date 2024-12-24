import { RiStarFill } from "react-icons/ri";

export const FilterCheckBox = ({
  name,
  item,
  handleCheck
}: {
  name: string,
  item: {id: string, name: string} | number;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>, filterKey: string) => void
}) => {
 
  return (
    <>
          {typeof item === "number" ? (<li>
            <label htmlFor={item.toString()}>
              <span className="inline-flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <RiStarFill
                    className={`${
                      Number(item) >= index + 1 ? "fill-yellow-400" : "fill-gray-200"
                    } text-xl`}
                    key={index}
                  />
                ))}
              </span>
            </label>
            <input
              type="checkbox"
              name={item.toString()}
              className="hidden"
              id={item.toString()}
              value={item}
              onChange={(e) => handleCheck(e, name)}
            />
          </li>
        ) : name === "colors" ? (
          <li key={item.id}>
            <label
              htmlFor={item.id}
              className={`w-4 h-4 rounded-full cursor-pointer flex items-center justify-center relative border border-neutral-200`}
              style={{
                backgroundColor: item.id,
              }}
            ></label>
            <input
              type="checkbox"
              name={item.id}
              className="hidden"
              value={item.id}
              id={item.id}
              onChange={(e) => handleCheck(e, name)}
            />
          </li>
        ) : (
          <li key={item.id} className="space-x-2">
            <input
              name={item.id}
              id={item.id}
              value={item.id}
              type="checkbox"
              onChange={(e) => handleCheck(e, name)}
            />
            <label htmlFor={item.id}>{item.name}</label>
          </li>
        )
      }
    </>
  );
};
