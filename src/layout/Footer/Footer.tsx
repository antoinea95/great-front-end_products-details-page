import { NewsLetter } from "./Newsletter";
import { FooterLinksSection } from "./FooterLinksSection";
import { FooterSocialSection } from "./FooterSocialSection";

export const Footer = () => {
  return (
    <footer className="py-2 space-y-8 sm:space-y-12">
      <NewsLetter />
      <section className="space-y-8 lg:flex lg:items-center lg:justify-between">
        <div className="space-y-4 sm:w-1/2 lg:w-1/3">
          <div>
            <img src="./assets/navbar/stylenest.svg" />
          </div>
          <p className="text-neutral-600">
            Craft stunning style journeys that weave more joy into every thread.
          </p>
        </div>
        <div className="space-y-8 sm:space-y-0 pb-12 sm:pb-0 border-neutral-200 sm:flex sm:items-start sm:justify-between sm:w-2/3 lg:w-1/2">
          <FooterLinksSection
            item={{
              title: "Shop categories",
              links: [
                { url: "#", name: "Unisex" },
                { url: "#", name: "Women" },
                { url: "#", name: "Men" },
              ],
            }}
          />
          <FooterLinksSection
            item={{
              title: "Shop collections",
              links: [
                { url: "#", name: "Latest arrivals" },
                { url: "#", name: "Urban Oasis" },
                { url: "#", name: "Cozy Comfort" },
                { url: "#", name: "Fresh Fusion" },
              ],
            }}
          />
        </div>
      </section>

      <FooterSocialSection />
    </footer>
  );
};
