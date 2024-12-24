import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { PaginationType, ProductType } from "./Product.types";
import { ProductCard } from "./ProductCard";
import { useLocation } from "react-router";
import { sectionTitle } from "../../utils/tailwindClass";
import { Filters } from "../Filters/Filters";
import { RiArrowDownSLine, RiFilterLine } from "react-icons/ri";
import { useState } from "react";
import { useFilteredProducts, useProductFilters } from "../../hooks/products.hook";

export const ProductsGrid = React.memo(({ params }: { params?: Record<string, string> }) => {
  const { pathname } = useLocation();
  const { data: products, isLoading } = useFetch<{data: ProductType[]; pagination: PaginationType}>("products", params);
  const { collections, categories, colors, ratings } = useProductFilters(products?.data);


  const [filtersActive, setFiltersActive] = useState<Record<string, string[]>>({
    collections: [],
    categories: [],
    colors: [],
    ratings: [],
  });

  console.log(filtersActive);
  

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { filteredProducts } = useFilteredProducts(products?.data || [], filtersActive);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, filterKey: string) => {
    const selectedFilters = filtersActive[filterKey];
    const value = e.target.value;

    console.log(value);
    

    setFiltersActive((prev) => ({
      ...prev,
      [filterKey]: selectedFilters.includes(value)
        ? selectedFilters.filter((item) => item !== value)
        : [...selectedFilters, value],
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-12 lg:py-24 space-y-8 rounded-md lg:flex lg:gap-20">
      {/* Filters */}
      <Filters
        isFiltersOpen={isFiltersOpen}
        handleCheck={handleCheck}
        collections={collections}
        categories={categories}
        colors={colors}
        ratings={ratings}
      />

      {/* Main Content */}
      <div className="flex flex-col space-y-6 w-3/4">
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

        {/* Products */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.product_id} />
          ))}
        </section>
      </div>
    </section>
  );
});
