import { Link } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosLogOut, IoIosMenu, IoIosClose } from "react-icons/io";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Navbar = () => {
  const navLinks: { name: string; link: string }[] = [
    { name: "HOME", link: "/" },
    { name: "SHOP", link: "/shop" },
    { name: "MEN", link: "/shop/men" },
    { name: "WOMEN", link: "/shop/women" },
    { name: "KIDS", link: "/shop/kids" },
  ];

  const userPages = [
    { name: "Cart", icon: FiShoppingCart, link: "/cart" },
    { name: "Profile", icon: IoPersonOutline, link: "/profile" },
    { name: "Logout", icon: IoIosLogOut },
  ];

  return (
    <nav className="w-full h-[10vh] md:h-[15vh] flex justify-center items-center">
      <div className="max-w-[1440px] mx-auto w-full flex justify-between px-5 md:px-5">
        {/* === Header Logo === */}
        <Link to="/">
          <h1 className="font-bold text-2xl md:text-3xl my-auto font-[syne] text-primary">
            NJUMUU
          </h1>
        </Link>
        {/* === Navigation Links === */}
        <ul className="hidden md:flex gap-5 md:gap-6">
          {navLinks.map((navLink, index) => (
            <Link to={navLink.link} key={index}>
              <li
                key={index}
                className="px-4 py-2 border-b-2 border-b-background hover:border-b-primary hover:text-primary"
              >
                {navLink.name}
              </li>
            </Link>
          ))}
        </ul>
        {/* === User Utils === */}
        <div className="hidden md:flex gap-5">
          {userPages.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Link to={item.link || "#"}>
                {/* <FiShoppingCart className="text-2xl" /> */}
                <item.icon className="text-2xl" />
                <span className="md:hidden">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* === Mobile Menu === */}
        <div className="md:hidden flex items-center gap-3">
          <Link to='/cart'>
          <div className="flex items-center">
            <FiShoppingCart className="text-2xl" />
          </div>
          </Link>
          
          <Drawer>
            <DrawerTrigger asChild>
              <IoIosMenu className="text-3xl" />
            </DrawerTrigger>
            <div className="relative">
              <DrawerContent className="grid gap-5">
                <div className="mx-auto w-full max-w-sm">
                  {/* === Navigation Links === */}
                  <ul className="grid gap-2 md:gap-6">
                    {navLinks.map((navLink, index) => (
                      <Link to={navLink.link} key={index}>
                        <DrawerClose
                          key={index}
                          className="px-4 py-2 border-b-2 border-b-background hover:border-b-primary hover:text-primary"
                        >
                          {navLink.name}
                        </DrawerClose>
                      </Link>
                    ))}
                  </ul>
                  {/* === User Utils === */}
                  <div className="grid gap-5 my-5">
                    <Link to="/profile">
                      <div className="flex items-center gap-2 px-4 py-2">
                        <IoPersonOutline className="text-2xl" />
                        <span>Profile</span>
                      </div>
                    </Link>
                    
                    <div className="flex items-center gap-2 px-4 py-2">
                      <IoIosLogOut className="text-2xl" />
                      <span className="">Logout</span>
                    </div>
                  </div>

                  <div className="absolute top-5 right-5">
                    <DrawerClose asChild>
                      <IoIosClose className="text-3xl" />
                    </DrawerClose>
                  </div>
                </div>
              </DrawerContent>
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
