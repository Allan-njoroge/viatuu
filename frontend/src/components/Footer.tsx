import { Link } from "react-router";

const Footer = () => {
  const navLinks: { name: string; link: string }[] = [
    { name: "HOME", link: "/" },
    { name: "SHOP", link: "/shop" },
    { name: "MEN", link: "/" },
    { name: "WOMEN", link: "/" },
    { name: "KIDS", link: "" },
  ];

  return (
    <div className=" py-10">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-evenly px-5 md:px-10 gap-10">
        {/* === Footer Logo === */}
        <Link to="/">
          <h1 className="font-bold text-3xl my-auto font-[syne] text-primary">
            NJUMUU
          </h1>
        </Link>

        {/* === Links === */}
        <div>
          <h3 className="font-[syne] font-bold text-2xl">LINKS</h3>
          <ul>
            {navLinks.map((item, index) => (
              <Link to={item.link} key={index}>
                <li className="text-muted-foreground my-2">{item.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        {/* === Links === */}
        <div>
          <h3 className="font-[syne] font-bold text-2xl">LINKS</h3>
          <ul>
            {navLinks.map((item, index) => (
              <Link to={item.link} key={index}>
                <li className="text-muted-foreground my-2">{item.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-5 pt-5 border-t-2 border-muted-foreground/40">
        All Right Reserved &copy; Njumuu {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Footer;