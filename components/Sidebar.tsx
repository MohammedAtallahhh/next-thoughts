import Link from "next/link";
import { useState } from "react";

// components
import Discover from "./Discover";

// icons
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useRouter } from "next/router";
import SidebarFooter from "./SidebarFooter";
import useAuthStore from "../store/authStore";

const sidebarClasses = {
  sidebar:
    "h-[92vh] overflow-hidden lg:hover:overflow-auto lg:border-r-2 lg:border-gray-200",

  toggleBtn: "block lg:hidden p-1 text-2xl",

  categoryList: "w-20 lg:w-[350px] flex flex-col justify-start mb-10 p-3",

  homeCategory: "border-gray-200 lg:border-b-2 lg:pb-4",
  homeItem:
    "flex justify-center items-center gap-3 p-3 font-semibold text-black rounded cursor-pointer hover:bg-primary lg:justify-start",
  homeItemActive:
    "flex justify-center items-center gap-3 p-3 font-semibold text-[#F51997] rounded cursor-pointer hover:bg-primary lg:justify-start",

  login: "px-2 py-4 border-b-2 border-gray-200 hidden lg:block",
  loginBtn:
    "font-semibold text-lg bg-white text-[#F51997] border-[1px] border-[#F51997] px-6 py-3 rounded-md outline-none w-full mt-3 cursor-pointer transition-all hover:text-white hover:bg-[#F51997]",
};

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const router = useRouter();
  const { asPath } = router;

  const { userProfile } = useAuthStore();

  let {
    sidebar,
    toggleBtn,
    categoryList,
    homeCategory,
    homeItem,
    homeItemActive,
    login,
    loginBtn,
  } = sidebarClasses;

  // Adding border when sidebar is shown on mobile screen
  sidebar = showSidebar
    ? sidebar.concat(" border-r-2 border-gray-200")
    : sidebar;

  return (
    <aside className={sidebar}>
      {/* Sidebar header */}
      <header className="flex justify-center p-3">
        <button
          className={toggleBtn}
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </button>
      </header>

      {/* Sidebar content */}
      {showSidebar && (
        // Categories (tags) of content
        <div className={categoryList}>
          {/* Content for home */}
          <div className={homeCategory}>
            <Link href="/">
              <div className={asPath === "/" ? homeItemActive : homeItem}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>

                <span className="text-xl hidden lg:block">For You</span>
              </div>
            </Link>
          </div>

          {/* Login button when no logged in */}
          {!userProfile && (
            <div className={login}>
              <p className="text-gray-400">
                Login to interact with the content.
              </p>

              <div className="pr-4">
                <button className={loginBtn}>Log in</button>
              </div>
            </div>
          )}

          <Discover />
          <SidebarFooter />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
