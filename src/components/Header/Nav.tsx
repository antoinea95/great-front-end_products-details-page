export const Nav = ({ isOpen }: { isOpen: boolean }) => {
  const mobileNav = `bg-white absolute left-0 top-16 overflow-hidden w-screen h-screen max-h-dvh py-8 px-14 transition-all ${
    isOpen
      ? "-translate-x-6 pointer-events-auto"
      : "pointer-events-none -translate-x-[100vw]"
  }`;
  const desktopNav =
    "lg:static lg:translate-x-0 lg:w-fit lg:pointer-events-auto lg:h-fit";

  return (
    <nav
      className={`text-base lg:text-xl ${mobileNav} ${desktopNav}`}
      aria-label="Main-navigation"
    >
      <ul
        className="space-y-4 lg:flex lg:items-center lg:space-y-0 lg:gap-8"
        role="menu"
      >
        <li className="relative group whitespace-nowrap" role="menuitem">
          <a
            href="#"
            className="focus:outline-none focus-visible:ring focus-visible:ring-black"
          >
            Shop all
          </a>
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full"></span>
        </li>
        <li className="relative group whitespace-nowrap" role="menuitem">
          <a
            href="#Test"
            className="focus:outline-none focus-visible:ring focus-visible:ring-black"
          >
            Latest arrivals
          </a>
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full"></span>
        </li>
      </ul>
    </nav>
  );
};
