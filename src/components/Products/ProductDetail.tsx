import { useParams, useSearchParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { ProductCarousel } from "./ProductCarousel";
import { Rating } from "../Elements/Rating";
import { SelectColor } from "../Elements/SelectColor";
import { Sizes } from "../Elements/Sizes";
import { useGetProductDetailsByColor } from "../../hooks/products.hook";
import { CartType, ProductType } from "./Product.types";
import { PriceTag } from "../Elements/PriceTag";
import { QuantityModifier } from "../Elements/QuantityModifier";
import { mainTitle } from "../../utils/tailwindClass";
import { useState } from "react";
import { ProductInfo } from "./ProductInfo";
import { ProductSpecification } from "../Specifications/ProducSpecification";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const colorToDisplay = searchParams.get("color");
  const sizeToDisplay = searchParams.get("size");
  const quantityToDisplay = searchParams.get("quantity");
  const { data: product, isLoading } = useFetch<ProductType>(
    `products/${productId}`
  );

  const { images, inventoryItem, stockInThisColor, stockBySizes } =
    useGetProductDetailsByColor(product, colorToDisplay!, sizeToDisplay);

  const [cart, setCart] = useState<CartType[] | []>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  if (isLoading || !product || !inventoryItem) {
    return <p>...loading</p>;
  }

  const isDiscount =
    inventoryItem.discount || inventoryItem.discount_percentage;

  const handleAddCart = () => {
    // Find if the price is sale or not
    const itemPrice =
      inventoryItem.sale_price === inventoryItem.list_price
        ? inventoryItem.list_price
        : inventoryItem.sale_price;

    // Convert quantity in number
    const quantity = quantityToDisplay ? Number(quantityToDisplay) : 1;

    // New item to add
    const newItem: CartType = {
      product: product.product_id,
      size: sizeToDisplay ? sizeToDisplay : undefined,
      color: colorToDisplay!,
      quantity,
      price: itemPrice * quantity,
    };

    // Find if same product is already in cart
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.product === product.product_id &&
        item.size === sizeToDisplay &&
        item.color === colorToDisplay
    );

    if (existingProductIndex !== -1) {
      // Update quantity and price only if the product, size, and color are identical
      const updatedCart = [...cart]; // create a shallow copy
      const existingProduct = updatedCart[existingProductIndex];
      updatedCart[existingProductIndex] = {
        ...existingProduct,
        quantity: existingProduct.quantity + quantity,
        price: itemPrice * (existingProduct.quantity + quantity),
      };
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
      setCart([...cart, newItem]);
    }
  };

  const isStockInThisColor = stockInThisColor[colorToDisplay!] > 0;

  return (
    <>
      <section className="space-y-12 lg:space-y-0 py-12 rounded-md lg:flex lg:justify-center lg:gap-8 lg:py-24">
        <ProductCarousel images={images} />
        <section className="space-y-8 lg:w-1/2">
          <h1 className={mainTitle}>{product.name}</h1>
          <div className="w-fit space-y-2">
            <PriceTag inventoryItem={inventoryItem} />
            {isDiscount && (
              <span className="font-medium text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-full py-1 px-2 inline-flex">
                {inventoryItem.discount
                  ? `${inventoryItem.discount}$ OFF`
                  : `${inventoryItem.discount_percentage}% OFF`}
              </span>
            )}
            <Rating rating={product.rating} reviews={product.reviews} />
          </div>
          <p>{product.description}</p>
          <SelectColor
            colors={product.colors}
            stockInThisColor={stockInThisColor}
          />
          {stockBySizes && (
            <Sizes sizes={product.sizes} stockBySizes={stockBySizes} />
          )}
          <QuantityModifier
            stock={stockBySizes ? stockBySizes : stockInThisColor}
            selectedKey={sizeToDisplay ? sizeToDisplay : colorToDisplay}
          />
          {!isStockInThisColor && (
            <p className="hidden lg:block text-2xl font-medium text-neutral-900">
              Sorry, this item is out of stock
            </p>
          )}
          <button
            onClick={handleAddCart}
            className={`bg-indigo-700 w-full text-white py-4 lg:py-4 rounded-md ${
              isStockInThisColor
                ? "bg-indigo-700"
                : "bg-neutral-100 text-neutral-400"
            }`}
            disabled={isStockInThisColor}
          >
            Add to cart
          </button>
          <div className="space-y-4">
            {product.info.map((info) => (
              <ProductInfo key={info.title} info={info} />
            ))}
          </div>
        </section>
      </section>
      <section>
        <ProductSpecification />
      </section>
    </>
  );
};
