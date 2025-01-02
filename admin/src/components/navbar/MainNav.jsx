import React from "react";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  const navStyles = ({ isActive }) => {
    if (isActive) {
      return "py-1 px-4 rounded-full bg-blue-900 text-zinc-100 transition-all duration-300";
    }

    return "py-1 px-4 rounded-full text-zinc-800 transition-all duration-300";
  };

  return (
    <div className="hidden md:block mr-28">
      <ul className="flex gap-2 transition-all duration-300">
        <li>
          <NavLink
           to={"/home"} className={navStyles}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/users"} className={navStyles}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to={"/skills"} className={navStyles}>
            Skills
          </NavLink>
        </li>
        <li>
          <NavLink to={"/events"} className={navStyles}>
            Events
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
