export const PriceTag = ({
  price,
  mainPriceSet,
  littlePriceSet,
}: {
  price: { sale?: number; list?: number } | null;
  mainPriceSet: string;
  littlePriceSet: string;
}) => {

    if(!price) return;
  return (
    <>
      {price.sale ? (
        <p className={`flex items-center gap-2 ${mainPriceSet}`}>
          ${price.sale}{" "}
          <span className={`${littlePriceSet} line-through`}>
            ${price.list}
          </span>
        </p>
      ) : (
        <p className={`${mainPriceSet}`}>${price.list}</p>
      )}
    </>
  );
};
