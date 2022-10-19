import React from "react";
import { footerList1 } from "../utils/constants";

const SidebarFooter = () => {
  return (
    <footer className="mt-6 hidden lg:block">
      <div className="flex flex-wrap gap-2">
        {footerList1.map((item) => (
          <p
            key={item}
            className="text-sm text-gray-400 cursor-pointer hover:underline"
          >
            {item}
          </p>
        ))}
      </div>
    </footer>
  );
};

export default SidebarFooter;
