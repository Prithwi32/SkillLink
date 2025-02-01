import React from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import LogoutButton from "./LogoutButton";
import MobileNav from "./MobileNav";

const Navbar = () => {

  return (
    <nav className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-300 sticky top-0 bg-white z-10">
      <div>
      <Link to="/" onClick={()=>scrollTo(0,0)} className="text-2xl font-bold hover:opacity-75">
      <img src="/logo.png" alt="Logo" className="inline-block w-6 h-6 mr-2" />
      Skill<span className="text-blue-700">Link</span>
      </Link>
      </div>

      <MainNav />
      <div className="flex gap-2">
        <div className="flex items-center gap-4">
          <MobileNav />
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
