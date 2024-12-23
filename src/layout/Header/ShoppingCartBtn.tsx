import { RiShoppingBag3Line } from "react-icons/ri";

export const ShoppingCartBtn = () => {
  return (
    <a href="#" aria-label="Go to your shopping cart" className="hover:scale-110 transition-transform active:scale-100 focus:outline-none focus-visible:ring focus-visible:ring-black text-xl">
      <RiShoppingBag3Line />            
    </a>
  );
};
