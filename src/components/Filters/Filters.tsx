import { RiCloseLine } from "react-icons/ri";
import { sectionSubtitle } from "../../utils/tailwindClass";
import { Dispatch, SetStateAction } from "react";
import { FilterContainer } from "./FilterContainer";
import { FilterCheckBox } from "./FilterCheckBox";

export const Filters = ({
  isFiltersOpen,
  setIsFiltersOpen,
  filtersActive,
  setFiltersActive,
  collections,
  categories,
  colors,
}: {
  isFiltersOpen: boolean;
  setIsFiltersOpen: Dispatch<SetStateAction<boolean>>;
  filtersActive: Record<string, string[] | null>;
  setFiltersActive: Dispatch<SetStateAction<Record<string, string[] | null>>>;
  collections: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  colors: { id: string; name: string }[];
}) => {


  return (
    <section
      className={`${
        !isFiltersOpen ? "-translate-x-[100vw] lg:translate-x-0" : "translate-x-0"
      } p-8 absolute lg:relative lg:h-fit lg:w-1/4 left-0 top-0 h-screen bg-white w-[99vw] z-10 space-y-8`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <h3 className={sectionSubtitle}>Filter</h3>
        <button onClick={() => setIsFiltersOpen(false)}>
          <RiCloseLine />
        </button>
      </div>
      <div className="space-y-4">
        <FilterContainer title="Collections">
          <FilterCheckBox
            items={collections}
            setFilterFn={setFiltersActive}
            filtersActive={filtersActive}
            filterKey="collections"
          />
        </FilterContainer>
        <FilterContainer title="Categories">
          <FilterCheckBox
            items={categories}
            setFilterFn={setFiltersActive}
            filtersActive={filtersActive}
            filterKey="categories"
          />
        </FilterContainer>
        <FilterContainer title="Colors">
          <FilterCheckBox
            items={colors}
            setFilterFn={setFiltersActive}
            filtersActive={filtersActive}
            filterKey="colors"
          />
        </FilterContainer>
        <FilterContainer title="Rating">
          <FilterCheckBox
            items={[1, 2, 3, 4, 5].reverse()}
            setFilterFn={setFiltersActive}
            filtersActive={filtersActive}
            filterKey="rating"
          />
        </FilterContainer>
      </div>
    </section>
  );
};
