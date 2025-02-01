import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/home', label: 'Home' },
    { to: '/users', label: 'Users' },
    { to: '/skills', label: 'Skills' },
    { to: '/events', label: 'Events' },
  ];

  const navStyles = ({ isActive }) =>
    isActive
      ? 'py-2 px-[40%] rounded-full bg-blue-900 text-zinc-100 transition-all duration-300'
      : 'py-2 px-[40%] rounded-full text-zinc-800 transition-all duration-300 hover:bg-blue-100';

  const handleNavClick = () => {
    scrollTo(0,0);
    setIsOpen(false); // Close the sheet when an option is selected
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden rounded-full">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left text-xl">Skill<span className='text-blue-700'>Link</span></SheetTitle>
        </SheetHeader>
        <nav className="mt-6">
          <ul className="flex flex-col justify-center text-center gap-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={navStyles}
                  onClick={handleNavClick}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
