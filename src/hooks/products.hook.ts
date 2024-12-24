import { useMemo } from "react";
import { ProductType } from "../components/Products/Product.types";
import { extractUniqueFilters } from "../utils/products.utils";

// Hook pour récupérer les informations liées à une couleur spécifique
export const useGetProductDetailsByColor = (
  product: ProductType,
  colorToDisplay: string,
  sizeToDisplay?: string | null
) => {
  return useMemo(() => {
    if (!product || !colorToDisplay) {
      return {
        inventoryItem: null,
        stockInThisColor: null,
        stockBySizes: null,
        images: [],
      };
    }

    const stockInThisColor = product.inventory.reduce<Record<string, number>>(
      (acc, item) => {
        acc[item.color] = item.stock;
        return acc;
      },
      {}
    );

    const stockBySizes =
      product.sizes.length > 0
        ? product.inventory
            .filter((item) => item.color === colorToDisplay)
            .reduce<Record<string, number>>((acc, item) => {
              const size = item.size.toString();
              acc[size] = item.stock;
              return acc;
            }, {})
        : null;

    const inventoryItem = product.inventory.find((item) => {
      if (product.sizes.length > 0 && sizeToDisplay) {
        const sizeType = typeof item.size;
        const findSize =
          sizeType === "string"
            ? item.size === sizeToDisplay
            : item.size === Number(sizeToDisplay);
        return item.color === colorToDisplay && findSize;
      }
      return item.color === colorToDisplay;
    });

    const imageItems = product.images.filter(
      (image) => image.color === colorToDisplay
    );

    return {
      inventoryItem,
      stockInThisColor,
      stockBySizes,
      images: imageItems,
    };
  }, [product, colorToDisplay, sizeToDisplay]);
};

export const useFilteredProducts = (
  products: ProductType[],
  filtersActive: Record<string, string[]>
): { filteredProducts: ProductType[] } => {
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products.filter((product) => {
      const { collections, categories, colors, ratings } = filtersActive;

      // Filter by collections
      if (
        collections.length > 0 &&
        !collections.includes(product.collection.collection_id)
      ) {
        return false;
      }

      // Filter by categories
      if (
        categories.length > 0 &&
        !categories.includes(product.category.category_id)
      ) {
        return false;
      }

      // Filter by colors
      if (
        colors.length > 0 &&
        !product.colors.some((color) => colors.includes(color))
      ) {
        return false;
      }

      // Filter by rating
      if (ratings.length > 0) {
        // Convert ratings to numbers and sort them
        const sortedRatings = ratings.map(Number).sort((a, b) => a - b);

        // Assume that the range is defined by the first two sorted ratings
        const minRating = sortedRatings[0];

        // Check if the product rating is outside the range
        if (product.rating < minRating) {
          return false;
        }
      }
      
      // Pass all filters
      return true;
    });
  }, [products, filtersActive]);

  return { filteredProducts };
};

export const useProductFilters = (products: ProductType[] | undefined) => {
  const filters = useMemo(() => {
    if (!products)
      return { collections: [], categories: [], colors: [], ratings: [] };

    // Extract collections
    const collections = extractUniqueFilters(
      products.map((product) => ({
        id: product.collection.collection_id,
        name: product.collection.name,
      }))
    );

    // Extract categories
    const categories = extractUniqueFilters(
      products.map((product) => ({
        id: product.category.category_id,
        name: product.category.name,
      }))
    );

    // Extract colors
    const colors = extractUniqueFilters(
      products.flatMap((product) =>
        product.colors.map((color) => ({
          id: color,
          name: color.toUpperCase(),
        }))
      )
    );

    const ratings = [
      { id: "5", name: "five" },
      { id: "4", name: "four" },
      { id: "3", name: "three" },
      { id: "2", name: "two" },
      { id: "1", name: "one" },
    ];

    return { collections, categories, colors, ratings };
  }, [products]);

  return filters;
};
