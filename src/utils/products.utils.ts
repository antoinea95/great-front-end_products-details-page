import { Dispatch, SetStateAction } from "react";
import { ImageItem } from "../components/Products/Product.types";
import { SetURLSearchParams } from "react-router";

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
      result.push({ color, image_url });
      usedColors.add(color);
    }
  });

  return result;
};

export const handleChangeAndUpdateParamsUrl = (
  item: string,
  setItem: Dispatch<SetStateAction<string>>,
  paramsName: string,
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams
) => {

  setItem(item);
  searchParams.set(paramsName, item);
  setSearchParams(searchParams);
};
