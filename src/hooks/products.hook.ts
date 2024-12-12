import { useMemo } from "react";
import { ProductType } from "../components/Products/Product.types";

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
