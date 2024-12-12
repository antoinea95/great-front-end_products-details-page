import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router";

export const Nav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const mobileNav = `bg-gray-200 absolute left-0 top-16 overflow-hidden w-screen h-screen max-h-dvh py-8 px-14 transition-all ${
    isOpen
      ? "-translate-x-6 pointer-events-auto"
      : "pointer-events-none -translate-x-[100vw]"
  }`;
  const desktopNav =
    "lg:static lg:translate-x-0 lg:w-fit lg:pointer-events-auto lg:h-fit";

  return (
    <nav
      className={`${mobileNav} ${desktopNav} z-50`}
      aria-label="Main-navigation"
    >
      <ul
        className="space-y-4 lg:flex lg:items-center lg:space-y-0 lg:gap-8"
        role="menu"
      >
        <li className="relative group whitespace-nowrap" role="menuitem">
          <NavLink
            to="/shop-all"
            className={`relative focus:outline-none focus-visible:ring focus-visible:ring-black w-fit`}
            onClick={() => setTimeout(() => setIsOpen(false), 500)}
          >
            {({ isActive }) => (
              <>
                Shop all
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-200 ${
                    isActive ? "w-full" : "w-0 lg:group-hover:w-full"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>
        <li className="relative group whitespace-nowrap" role="menuitem">
          <NavLink
            to="/latest"
            className={`relative focus:outline-none focus-visible:ring focus-visible:ring-black w-fit`}
            onClick={() => setTimeout(() => setIsOpen(false), 500)}

          >
            {({ isActive }) => (
              <>
                Latest arrivals
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-200 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
