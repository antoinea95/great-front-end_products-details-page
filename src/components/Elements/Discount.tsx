export const Discount = ({ discount}: { discount: string | null }) => {
  if(!discount) return null;
  
  return <p className="bg-amber-50 border border-amber-200 text-amber-700 w-fit py-1 px-4 rounded-full">{discount}</p>;
};
