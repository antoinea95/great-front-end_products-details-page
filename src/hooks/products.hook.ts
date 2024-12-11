import { useMemo } from "react";
import { ProductType } from "../components/Products/Product.types";

// Hook pour récupérer les informations liées à une couleur spécifique
export const useGetProductDetailsByColor = (
  product: ProductType,
  colorToDisplay: string
) => {
  return useMemo(() => {
    if (!product || !colorToDisplay) {
      // Retourne des valeurs par défaut si les paramètres sont manquants
      return {
        inventoryItem: null,
        images: [],
        price: null,
        discount: null,
      };
    }
    // Trouver l'inventaire et l'image correspondant à la couleur
    const inventoryItem = product.inventory.find(
      (item) => item.color === colorToDisplay
    );
    const imageItems = product.images.filter(
      (image) => image.color === colorToDisplay
    );

      // Calculer le prix en fonction de l'inventaire trouvé
      const salePrice = inventoryItem?.sale_price;
      const listPrice = inventoryItem?.list_price;
      const price: { sale?: number, list?: number } | null = inventoryItem ? {
        list: listPrice,
      } : null;
      if (salePrice !== listPrice && price) price.sale = salePrice;

    const discount = inventoryItem
      ? inventoryItem.discount_percentage
        ? `${inventoryItem.discount_percentage}% OFF`
        : inventoryItem.discount
        ? `${inventoryItem.discount}$ OFF`
        : null
      : null;

    return {
      inventoryItem,
      images: imageItems,
      price,
      discount,
    };
  }, [product, colorToDisplay]);
};
