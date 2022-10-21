import Image from "next/image";
import Link from "next/link";

import useAuthStore from "../store/authStore";

import { GoogleLogin, googleLogout } from "@react-oauth/google";

// icons
import { IoIosLogOut, IoMdAdd } from "react-icons/io";

// images
import logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";

// TailwindCss classes
const navClasses = {
  nav: "h-[8vh] flex justify-between items-center border-b-2 border-gray-200 py-2 px-2 md:px-6",

  logoInner: "w-[80px] md:w-[130px]",
  navActions: "flex items-center gap-5",
  uploadBtn: "flex items-center gap-2 border-2 p-2 text-md font-semibold",
};

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  const { nav, logoInner, navActions, uploadBtn } = navClasses;
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

      <div className="search"></div>

      {/* Navbar links and actions */}
      {userProfile ? (
        <div className={navActions}>
          {/* Upload link */}
          <Link className="upload" href="/upload">
            <button className={uploadBtn}>
              <IoMdAdd className="text-xl" />{" "}
              <span className="hidden md:block">Upload</span>
            </button>
          </Link>

          {/* user icon */}
          <Link href="/" className="cursor-pointer">
            <Image
              src={userProfile.image}
              alt="Profile picture"
              width={45}
              height={45}
              className="rounded-full"
            />
          </Link>

          {/* logout button */}
          <button
            className="border-2 border-red-500 p-2 rounded"
            onClick={() => {
              googleLogout();
              removeUser();
            }}
          >
            <IoIosLogOut color="red" fontSize={21} />
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(res) => createOrGetUser(res, addUser)}
          onError={() => console.log("Error")}
        />
      )}
    </nav>
  );
};

export default Navbar;
