import { ImageItem } from "../components/Products/Product.types";

export const preloadImages = (images: { image_url: string }[]) => {
  images.forEach((image) => {
    const img = new Image();
    img.src = image.image_url;
  });
};

export const formatImages = (images: ImageItem[]): ImageItem[] => {
  const usedColors = new Set<string>();
  const urls = [...new Set(images.map((image) => image.image_url))];

  const result: ImageItem[] = [];

  images.forEach(({ color }, index) => {
    const image_url = urls[index] ? urls[index] : urls[1];
    if (!usedColors.has(color)) {
      result.push({ color, image_url});
      usedColors.add(color);
    }
  });

  console.log(result);
  return result;
};
