import Image from "@/assets/Shoe.jpg";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { useEffect } from "react";
import axios from "axios";
import { ProductCardProps } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";


const ProductCard = ({
  product_id,
  name,
  price,
  link,
  category,
  image,
}: ProductCardProps) => {
  const {toast} = useToast();


  const addToCart = async(product_id: number, user_id: number, quantity: number) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/orders/cart/${user_id}`, {
          product_id: product_id,
          quantity: quantity,
        }
      );
      toast({
        title: `${name}`,
        description: "Successfully added to cart",
      })
      // console.log(response.data)
      console.log(response.data.message)
    } catch (err: any) {
      toast({
        title: `${name}`,
        description: "Failed to add to cart",
      })
    }
  }

  useEffect(() => {
  }, []);

  return (
      <div className="grid h-full border-2 border-muted-foreground/10 hover:border-muted-foreground/30 rounded-lg overflow-hidden w-9/10 p-1 md:p-3 transition-all ease-in-out duration-300">
        <div className="w-full h-full rounded-sm overflow-hidden">
          <img
            src={Image || image}
            alt={name}
            className="w-full h-full object-cover hover:scale-110 transition-all ease-in-out duration-300"
          />
        </div>
        <div className="px-3 py-2 w-full">
          <Link to={link}>
            <h4 className="font-semibold text:xl md:text-2xl font-[syne]">
              {name}
            </h4>
            <p className="text-xs text-muted-foreground/80">{category}'s Shoes</p>
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-center mt-4 justify-between gap-3 lg:gap-0">
            <p className="md:text-xl text-left font-[syne]">Kes {price}</p>
            <Button onClick={() => addToCart(product_id, 2, 4)}>Add to Cart</Button>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
