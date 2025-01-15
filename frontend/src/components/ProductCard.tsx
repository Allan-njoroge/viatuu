import Image from "@/assets/Shoe.jpg";
import { Link } from "react-router";
import { Button } from "./ui/button";


type Props = {
  name: string,
  price: number,
  link: string,
  category: string,
  image: string
}

const ProductCard = ({ name, price, link, category, image }: Props) => {
  return (
    <Link to={link}>
      <div className="grid h-full border-2 border-muted-foreground/10 hover:border-muted-foreground/30 rounded-lg overflow-hidden w-9/10 p-1 md:p-3 transition-all ease-in-out duration-300">
        <div className="w-full h-full rounded-sm overflow-hidden">
          <img
            src={Image}
            alt=""
            className="w-full h-full object-cover hover:scale-110 transition-all ease-in-out duration-300"
          />
        </div>
        <div className="px-3 py-2 w-full">
          <h4 className="font-semibold text:xl md:text-2xl font-[syne]">
            {name}
          </h4>
          <p className="text-xs text-muted-foreground/80">{category}'s Shoes</p>
          <div className="flex flex-col lg:flex-row lg:items-center mt-4 justify-between gap-3 lg:gap-0">
            <p className="md:text-xl text-left font-[syne]">Kes {price}</p>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
