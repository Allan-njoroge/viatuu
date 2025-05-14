import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { IoIosClose, IoIosLogOut, IoIosMenu } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { NavLinks } from "./Navbar";

interface Props {
  navLinks: NavLinks[];
  isAuthenticated: boolean;
}

const MobileMenu = ({ navLinks, isAuthenticated }: Props) => {
  return (
    <div className="md:hidden flex items-center gap-3">
      <Link to="/cart">
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
              {isAuthenticated ? (
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
              ) : (
                <Link to="/auth" className="flex my-5">
                  <DrawerClose>
                    <Button>Login</Button>
                  </DrawerClose>
                </Link>
              )}

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
  );
};

export default MobileMenu;
