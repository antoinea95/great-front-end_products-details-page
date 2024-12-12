import { useLocation } from "react-router";
import { InventoryItem } from "../Products/Product.types";

export const PriceTag = ({inventoryItem} : {inventoryItem: InventoryItem}) => {

    const {pathname} = useLocation();
    const isGrid = pathname.includes("shop-all") || pathname.includes("lastest");
    const styleOfText = isGrid ? "text-lg text-neutral-500" : "text-3xl text-neutral-900"
    const displaySalePrice = inventoryItem.sale_price !== inventoryItem.list_price;

    return (
        <p className={`flex items-center gap-2  ${styleOfText}`}>
        $
        {displaySalePrice
          ? inventoryItem.sale_price
          : inventoryItem.list_price}
        {displaySalePrice && (
          <span className={`line-through ${isGrid ? "text-sm":"text-base"} text-neutral-500`}>
            ${inventoryItem.list_price}
          </span>
        )}
      </p>
    )
}