import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { ProductInfoSection } from "../Products/ProductInfoSection";
import { handleChangeAndUpdateParamsUrl } from "../../utils/products.utils";
import { useNavigate, useSearchParams } from "react-router";

export const QuantityModifier = ({
  stock,
  selectedKey
}: {
  stock: Record<string, number>;
  selectedKey: string | null
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(searchParams.get("quantity")!);
  const isStock = stock[selectedKey!] > 0;
  const isNotEnoughStock = stock[selectedKey!] === Number(quantity);

  const handleAddProduct = () => {
    const quantityNumber = Number(quantity)
    if(selectedKey && stock[selectedKey] > quantityNumber) {      
      const newQuantity = quantityNumber + 1
      handleChangeAndUpdateParamsUrl(newQuantity.toString(), setQuantity, "quantity",searchParams, navigate)
    }
  }

  const handleRemoveProduct = () => {
    const quantityNumber = Number(quantity)
    if(quantityNumber > 1) {
      const newQuantity = quantityNumber - 1
      handleChangeAndUpdateParamsUrl(newQuantity.toString(), setQuantity, "quantity",searchParams, navigate)
    }
  }

  return (
    <ProductInfoSection title="Quantity">
      <div className={`${isStock ? "bg-neutral-50 border-neutral-200" : "bg-neutral-100 border-neutral-200"} border w-1/2 max-w-32 flex items-center rounded-lg relative`}>
        <button className={`p-2  flex items-center justify-center text-lg font-medium ${isNotEnoughStock || !isStock ? "text-neutral-400" : "text-neutral-600"}`} onClick={handleRemoveProduct} disabled={Number(quantity) === 1 || !isStock}>
          <RiSubtractLine />
        </button>
        <p className={`flex-1 text-center ${isStock ? "text-neutral-600" : "text-neutral-400"} font-medium`}>{isStock ? quantity : 0}</p>
        <button className={`p-2  flex items-center justify-center text-lg font-medium ${isNotEnoughStock || !isStock ? "text-neutral-400" : "text-neutral-600"}`} onClick={handleAddProduct} disabled={isNotEnoughStock || !isStock}>
          <RiAddLine />
          {isNotEnoughStock && <p className="bg-black rounded-lg absolute text-xs text-white text-nowrap px-4 py-2 -top-8">
            Insufficient stock
            <span className="inline-block w-0 h-0 
            border-l-[12px] border-l-transparent
            border-t-[12px] border-t-black
            border-r-[12px] border-r-transparent absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
          </p>}
        </button>
      </div>
    </ProductInfoSection>
  );
};
