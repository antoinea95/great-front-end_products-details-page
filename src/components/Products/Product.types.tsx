type Category = {
  category_id: string;
  name: string;
  created_at: string;
};

type Collection = {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string; // Idem pour la date
};

export type ImageItem = {
  color: string;
  image_url: string;
};

export type InventoryItem = {
  color: string;
  discount: number | null;
  discount_percentage: number | null;
  list_price: number;
  sale_price: number;
  size: string;
  sku: string;
  sold: number;
  stock: number;
};

type PriceRange = {
  highest: number;
  lowest: number;
};

export type PaginationType = {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
};

export type SizeClothesKey = "xs" | "sm" | "md" | "lg" | "xl";
export type SizeShoesKey = number;

export type ProductType = {
  category: Category;
  collection: Collection;
  colors: string[];
  created_at: string;
  description: string;
  images: ImageItem[];
  inventory: InventoryItem[];
  name: string;
  priceRange: PriceRange;
  product_id: string;
  rating: number;
  reviews: number;
  sizes: SizeClothesKey[] | SizeShoesKey[];
  sold: number;
};
