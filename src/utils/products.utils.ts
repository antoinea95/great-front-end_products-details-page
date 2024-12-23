import { Dispatch, SetStateAction } from "react";
import { ImageItem } from "../components/Products/Product.types";
import { NavigateFunction } from "react-router";



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
  searchParams: URLSearchParams,
  navigate: NavigateFunction
) => {


  setItem(item); 
  searchParams.set(paramsName, item);

  navigate(
    {
      pathname: location.pathname,
      search: searchParams.toString(),
    },
    { replace: true }
  );
};

export const extractUniqueFilters = <T extends { id: string; name: string }>(
  items: T[]
): { id: string; name: string }[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      return true;
    }
    return false;
  });
};

