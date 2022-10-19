import Image from "next/image";
import Link from "next/link";

// icons
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

// images
import logo from "../utils/tiktik-logo.png";

// TailwindCss classes
const navClasses = {
  nav: "h-[8vh] flex justify-between items-center border-b-2 border-gray-200 py-2 px-6",

  logoInner: "w-[100px] md:w-[130px]",
};

const Navbar = () => {
  const { nav, logoInner } = navClasses;
  return (
    // Navbar
    <nav className={nav}>
      {/* Logo */}
      <div className="logo">
        <Link href="/">
          <div className={logoInner}>
            {/* Logo Image */}
            <Image
              className="cursor-pointer"
              src={logo}
              alt="TikTik logo"
              layout="responsive"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
