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
      <div className="bg-gray-200 border border-gray-400 w-1/2 flex items-center rounded-lg">
        <button className="p-2 flex items-center justify-center text-lg font-medium text-neutral-600" onClick={handleRemoveProduct} disabled={Number(quantity) === 1}>
          <RiSubtractLine />
        </button>
        <p className="flex-1 text-center text-neutral-600 font-medium">{quantity}</p>
        <button className="p-2  flex items-center justify-center text-lg font-medium text-neutral-600" onClick={handleAddProduct} disabled={stock[selectedKey!] === Number(quantity)}>
          <RiAddLine />
        </button>
      </div>
    </ProductInfoSection>
  );
};
