import {
  RiColorFilterLine,
  RiHandHeartLine,
  RiPaintLine,
  RiPlantLine,
  RiPriceTag2Line,
  RiRainbowLine,
  RiRecycleLine,
  RiScales2Line,
  RiShapesLine,
  RiShieldStarLine,
  RiShirtLine,
  RiStackLine,
  RiTShirtLine,
  RiWaterFlashLine,
  RiWindyLine,
} from "react-icons/ri";
import { sectionTitle } from "../../utils/tailwindClass";
import { SpecificationsSlider } from "./SpecificationSlider";
import { useState } from "react";

const spectData = [
  {
    name: "Sustainbility",
    title: "Eco-Friendly Choice",
    img: "./assets/yellow-desktop.jpg",
    imgAlt: "Women in a yellow turtleneck",
    content:
      "With our sustainable approach, we curate clothing that makes a statement of care-care for the planet, and for the art of fashion.",
    caracteristics: [
      { icon: RiRecycleLine, content: "Recycled Materials" },
      { icon: RiPaintLine, content: "Low Impact Dye" },
      { icon: RiPlantLine, content: "Carbon Neutral" },
      { icon: RiWaterFlashLine, content: "Water Conservation" },
    ],
  },
  {
    name: "Comfort",
    title: "Uncompromised Comfort",
    img: "./assets/black-desktop.jpg",
    imgAlt: "Black sheets",
    content:
      "Our garments are a sanctuary of softness, tailored to drape gracefully and allow for freedom of movement.",
    caracteristics: [
      { icon: RiTShirtLine, content: "Ergonomic Fits" },
      { icon: RiHandHeartLine, content: "Soft-to-the-Touch Fabrics" },
      { icon: RiWindyLine, content: "Breathable Weaves" },
      { icon: RiColorFilterLine, content: "Thoughtful Design" },
    ],
  },
  {
    name: "Durability",
    title: "Built to Lastt",
    img: "./assets/chair-desktop.jpg",
    imgAlt: "Clothes fold on a white chair",
    content:
      "Here's to apparel that you can trust to look as good as new, wear after wear, year after year.",
    caracteristics: [
      { icon: RiStackLine, content: "Reinforced Construction" },
      { icon: RiScales2Line, content: "Quality Control" },
      { icon: RiShieldStarLine, content: "Material Resilience" },
      { icon: RiPriceTag2Line, content: "Warranty and Repair" },
    ],
  },
  {
    name: "Versality",
    title: "Versatile by Design",
    img: "./assets/clothes-desktop.jpg",
    imgAlt: "Clothes hang",
    content:
      "Our pieces are a celebration of versatility, offering a range of styles that are as perfect for a business meeting as they are for a casual brunch.",
    caracteristics: [
      { icon: RiRainbowLine, content: "Adaptive Styles" },
      { icon: RiShirtLine, content: "Functional Fashion" },
      { icon: RiPlantLine, content: "Timeless Aesthetics" },
      { icon: RiShapesLine, content: "Mix-and-Match Potential" },
    ],
  },
];

export const ProductSpecification = () => {

    const [activeSpec, setActiveSpec] = useState(spectData[0]);

  return (
    <section className="space-y-8">
      <h3 className={sectionTitle}>Discover timeless elegance</h3>
      <p>
        Step into a world where quality meets quintessential charm with our
        collection. Every thread weaves a promise of unparalleled quality,
        ensuring that each garment is not just a part of your wardrobe, but a
        piece of art. Here's the essence of what makes our apparel the hallmark
        for those with an eye for excellence and a heart for the environment.
      </p>
      <div className="flex items-center gap-8 overflow-x-auto border-b border-neutral-100">
        {spectData.map((spec) => (
          <button key={spec.name} onClick={() => setActiveSpec(spec)} className={`${activeSpec.name === spec.name ? "text-indigo-700  border-indigo-700" : "text-neutral-600 border-transparent"} border-b-2 transition-all p-4`}> {spec.name}</button>
        ))}
      </div>
      <SpecificationsSlider item={activeSpec} />
    </section>
  );
};
