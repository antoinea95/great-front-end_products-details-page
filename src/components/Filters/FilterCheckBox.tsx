import { Dispatch, SetStateAction } from "react";
import { RiStarFill } from "react-icons/ri";

export const FilterCheckBox = ({
  setFilterFn,
  filtersActive,
  items,
  filterKey,
}: {
  setFilterFn: Dispatch<SetStateAction<Record<string, string[] | null>>>;
  filtersActive: Record<string, string[] | null>;
  items: { name: string; id: string }[] | number[];
  filterKey: string;
}) => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arrayFilter = filtersActive[filterKey]
      ? filtersActive[filterKey]
      : [];

    if (arrayFilter.length === 0) {
      setFilterFn({
        ...filtersActive,
        [filterKey]: [e.target.value],
      });
    }
    if (!arrayFilter?.includes(e.target.value)) {
      setFilterFn({
        ...filtersActive,
        [filterKey]: [...arrayFilter, e.target.value],
      });
    } else if (arrayFilter.includes(e.target.value)) {
      setFilterFn({
        ...filtersActive,
        [filterKey]: arrayFilter.filter(
          (filter: string) => filter !== e.target.value
        ),
      });
    }
  };

  return (
    <ul
      className={`list-none ${
        filterKey === "colors"
          ? "flex items-center gap-4 flex-wrap"
          : "space-y-2"
      }`}
    >
      {items.map((item) =>
        typeof item === "number" ? (
          <li key={item}>
            <label htmlFor={item.toString()}>
              <span className="inline-flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <RiStarFill
                    className={`${
                      item >= index + 1 ? "fill-yellow-400" : "fill-gray-200"
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
              onChange={handleCheck}
            />
          </li>
        ) : filterKey === "colors" ? (
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
              onChange={handleCheck}
            />
          </li>
        ) : (
          <li key={item.id} className="space-x-2">
            <input
              name={item.id}
              id={item.id}
              value={item.id}
              type="checkbox"
              onChange={handleCheck}
            />
            <label htmlFor={item.id}>{item.name}</label>
          </li>
        )
      )}
    </ul>
  );
};
