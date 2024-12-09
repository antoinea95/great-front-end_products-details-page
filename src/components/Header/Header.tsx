import { ShoppingCartBtn } from "./ShoppingCartBtn";
import { Nav } from "./Nav";
import { useState } from "react";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="text-2xl col-span-4 sm:col-span-6 lg:col-span-12 h-fit flex items-center justify-between"
      role="banner"
    >
      {/* Logo & Navigation */}
      <div className="flex items-center justify-between lg:w-1/2">
        <img
          src="./assets/navbar/stylenest.svg"
          alt="Stylenest logo"
          className="lg:w-32"
        />
        <Nav isOpen={isOpen} />
      </div>

      {/* Actions buttons */}
      <section
        className="flex items-center gap-4"
        aria-label="Action buttons"
      >
        {!isOpen && <ShoppingCartBtn />}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden focus:outline-none focus-visible:ring focus-visible:ring-black"
          aria-controls="main-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </section>
    </header>
  );
};
