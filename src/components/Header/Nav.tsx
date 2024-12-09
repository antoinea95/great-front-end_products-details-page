
export const Nav = ({isOpen} : {isOpen: boolean}) => {

const mobileNav = `bg-white absolute left-0 top-16 overflow-hidden w-screen h-screen max-h-dvh p-4 px-14 transition-all ${isOpen ? "-translate-x-6" : "pointer-events-none -translate-x-[100vw]"}`
const desktopNav =  "lg:static lg:translate-x-0 lg:w-fit lg:pointer-events-all"

  return (
    <nav className={`text-lg ${mobileNav} ${desktopNav}`}>
      <ul className="space-y-4 lg:flex lg:items-center lg:space-y-0 lg:gap-8">
        <li>
          <a href="#">Shop all</a>
        </li>
        <li>
          <a href="#">Latest arrivals</a>
        </li>
      </ul>
    </nav>
  );
};
