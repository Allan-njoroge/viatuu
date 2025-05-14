import { Link } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MobileMenu from "./MobileMenu";
import { IconType } from "react-icons/lib";


export interface NavLinks {
  name: string;
  link: string;
}

interface UserPages {
  name: string;
  icon: IconType;
  link?: string;
}

const Navbar = () => {
  const navLinks: NavLinks[] = [
    { name: "HOME", link: "/" },
    { name: "SHOP", link: "/shop" },
    { name: "MEN", link: "/shop/Men" },
    { name: "WOMEN", link: "/shop/Women" },
    { name: "KIDS", link: "/shop/Kids" },
  ];

  const userPages: UserPages[] = [
    { name: "Cart", icon: FiShoppingCart, link: "/cart" },
    { name: "Profile", icon: IoPersonOutline, link: "/profile" },
    { name: "Logout", icon: IoIosLogOut },
  ];

  const { isAuthenticated } = useSelector((state: RootState) => state.user)

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
        {isAuthenticated ? (
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
        ) : (
          <Link to="/auth" className="hidden md:flex">
            <Button>Login</Button>
          </Link>
        )}

        {/* === Mobile Menu === */}
        <MobileMenu
          navLinks={navLinks}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </nav>
  );
};

export default Navbar;
