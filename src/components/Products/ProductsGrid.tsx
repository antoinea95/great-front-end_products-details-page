import { useFetch } from "../../hooks/useFetch";
import { PaginationType, ProductType } from "./Product.types";
import { ProductCard } from "./ProductCard";
import { useLocation } from "react-router";
import { sectionTitle } from "../../utils/tailwindClass";
import { Filters } from "../Filters/Filters";
import { RiArrowDownSLine, RiFilterLine } from "react-icons/ri";
import { useMemo, useState } from "react";
import useFilteredProducts from "../../hooks/products.hook";

// Types pour les filtres
interface FilterItem {
  id: string;
  name: string;
}

// Composant de chargement
const Loading = () => <p>...loading</p>;

// Fonction utilitaire pour extraire des filtres uniques
const extractUniqueFilters = <T extends { id: string; name: string }>(
  items: T[]
): FilterItem[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      return true;
    }
    return false;
  });
};

export const ProductsGrid = ({
  params,
}: {
  params?: Record<string, string>;
}) => {
  const { pathname } = useLocation();
  const { data: products, isLoading } = useFetch<{
    data: ProductType[];
    pagination: PaginationType;
  }>("products", params);
  const [filtersActive, setFiltersActive] = useState<
  Record<string, string[] | null>
>({
  collections: null,
  categories: null,
  colors: null,
  rating: null,
});

  const filteredProducts = useFilteredProducts(isLoading ? [] : products.data, filtersActive);

  // Extraire les filtres uniques via `useMemo`
  const allCollections = useMemo(() => {
    if (!products) return [];
    return extractUniqueFilters(
      products.data.map(({ collection }) => ({
        id: collection.collection_id,
        name: collection.name,
      }))
    );
  }, [products]);

  const allCategories = useMemo(() => {
    if (!products) return [];
    return extractUniqueFilters(
      products.data.map(({ category }) => ({
        id: category.category_id,
        name: category.name,
      }))
    );
  }, [products]);

  const allColors = useMemo(() => {
    if (!products) return [];
    return extractUniqueFilters(
      products.data.flatMap(({ colors }) =>
        colors.map((color) => ({ id: color, name: color.toUpperCase() }))
      )
    );
  }, [products]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  if (isLoading) return <Loading />;
  

  return (
    <section className="bg-white py-12 lg:py-24 space-y-8 rounded-md lg:flex">
      <Filters
        isFiltersOpen={isFiltersOpen}
        setIsFiltersOpen={setIsFiltersOpen}
        filtersActive={filtersActive}
        setFiltersActive={setFiltersActive}
        collections={allCollections}
        categories={allCategories}
        colors={allColors}
      />
      <div className="flex justify-between items-center">
        {pathname !== "/latest" ? (
          <button
            className="shadow-md border border-neutral-200 text-neutral-600 rounded-md px-4 py-2 flex items-center gap-2"
            onClick={() => setIsFiltersOpen(true)}
          >
            <RiFilterLine />
            Filter
          </button>
        ) : (
          <h1 className={sectionTitle}>Latest Arrivals</h1>
        )}
        <button className="shadow-md border border-neutral-200 text-neutral-600 rounded-md px-4 py-2 flex items-center gap-2">
          Sort by <RiArrowDownSLine />
        </button>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mx-auto">
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.product_id} />
        ))}
      </section>
    </section>
  );
};
