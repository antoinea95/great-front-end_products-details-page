import { InventoryItem } from "../Products/Product.types";

export const PriceTag = ({inventoryItem} : {inventoryItem: InventoryItem}) => {

    const displaySalePrice = inventoryItem.sale_price !== inventoryItem.list_price;

    return (
        <p className="flex items-center gap-2 text-3xl text-neutral-600">
        $
        {displaySalePrice
          ? inventoryItem.sale_price
          : inventoryItem.list_price}
        {displaySalePrice && (
          <span className="line-through text-base font-light text-neutral-500">
            ${inventoryItem.list_price}
          </span>
        )}
      </p>
    )
}