import { IconType } from "react-icons";
import { sectionSubtitle } from "../../utils/tailwindClass";

export const SpecificationsSlider = ({
  item,
}: {
  item: {
    name: string;
    title: string;
    img: string;
    imgAlt: string;
    content: string;
    caracteristics: {
      icon: IconType;
      content: string;
    }[];
  };
}) => {
  return (
    <div className="space-y-8 lg:flex lg:items-start lg:gap-8">
      <div className="max-h-52 sm:max-h-96 lg:max-h-none overflow-hidden rounded-md flex items-center justify-center lg:max-w-96">
        <img src={item.img} alt={item.imgAlt} className="h-full w-full" />
      </div>
      <div className="space-y-4 lg:flex lg:flex-col lg:justify-between gap-4">
        <div className="space-y-2">
          <h4 className={`${sectionSubtitle} font-medium`}>{item.title}</h4>
          <p className="text-neutral-600">{item.content}</p>
        </div>
        <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 lg:gap-2">
          {item.caracteristics.map((caracteristic) => {
            const Icon = caracteristic.icon;
            return (
              <p className="flex items-center gap-4">
                <span className="inline-flex shadow-md rounded-full text-xl p-3 text-indigo-700">
                  <Icon />
                </span>
                <span>{caracteristic.content}</span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
