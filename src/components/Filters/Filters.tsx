import { FilterContainer } from "./FilterContainer";

export const Filters = ({
  isFiltersOpen,
  handleCheck,
  collections,
  categories,
  colors,
  ratings
}: {
  isFiltersOpen: boolean;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>, filterKey: string) => void;
  collections: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  colors: { id: string; name: string }[];
  ratings: { id: string; name: string }[];
}) => {
  return (
    <section className={`transition-transform ${isFiltersOpen ? "open" : "closed"} w-1/4`}>
      <FilterContainer title="Collections" items={collections} handleCheck={(e) => handleCheck(e, "collections")} />
      <FilterContainer title="Categories" items={categories} handleCheck={(e) => handleCheck(e, "categories")} />
      <FilterContainer title="Colors" items={colors} handleCheck={(e) => handleCheck(e, "colors")} />
      <FilterContainer title="Ratings" items={ratings} handleCheck={(e) => handleCheck(e, "ratings")} />
    </section>
  );
};
