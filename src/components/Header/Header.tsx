import { ShoppingCartBtn } from "./ShoppingCartBtn";
import { Nav } from "./Nav";
import { useEffect, useState } from "react";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="text-xl col-span-4 sm:col-span-6 lg:col-span-12 h-fit flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center justify-between lg:w-2/5">
        <img src="./assets/navbar/stylenest.svg" alt="Stylenest logo" />
        <Nav isOpen={isLargeScreen || isOpen} />
      </div>

      {/* Action Buttons */}
      <section className="flex items-center gap-4">
        {!isOpen && <ShoppingCartBtn />}
        {!isLargeScreen && (
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            {isOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        )}
      </section>
    </header>
  );
};
