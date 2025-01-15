import Image from "@/assets/Shoe.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiShoppingCart } from "react-icons/fi";
import useFetch from "@/hooks/useFetch";
import { useLocation } from "react-router";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  image_url?: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
};

const Hero = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const location = useLocation();
  const pathname = location.pathname;
  const p_id = pathname.split("/")[2];
  const { data, loading, message } = useFetch<{ product: Product }>(
    `http://localhost:8000/api/products/${p_id}`
  );

  const product = data?.product;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>{message}</div>;
  }

  const increment = (e: any) => {
    e.preventDefault();
    setQuantity((prev) => prev+1);
  };

  const decrement = (e: any) => {
    e.preventDefault();
    setQuantity((prev) => prev-1);
  };

  // Function to handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1); // Reset to 1 if invalid value is entered
    }
  };

  return (
    <div className="px-5 md:px-10 w-full flex justify-between flex-col md:flex-row gap-5 md">
      {/* Image section */}
      <div className="flex-1 grid gap-3">
        <img src={Image} alt="Shoe Image" className="rounded-sm" />
        <div className="grid grid-cols-3 gap-3">
          <img src={Image} alt="" className="rounded-sm" />
          <img src={Image} alt="" className="rounded-sm" />
          <img src={Image} alt="" className="rounded-sm" />
        </div>
      </div>
      {/* Text Section */}
      <div className="flex-1 p-5">
        {/* Title field */}
        <div>
          <p className="text-muted-foreground">{product.category}'s Shoes</p>
          <h3 className="text-2xl md:text-3xl font-bold font-[syne]">
            {product.name}
          </h3>
        </div>
        {/* Description field */}
        <div className="my-8 grid gap-2">
          <h5 className="font-semibold text-xl">Product Description</h5>
          <p className="text-muted-foreground pl-2 leading-7 text-sm md:text-md">
            {product.description}
          </p>
        </div>
        {/* Form fields */}
        <form className="grid gap-5">
          {/* Size field
          <div className="flex items-center gap-3">
            <h6 className="font-semibold text-lg">Size</h6>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          {/* Quantity Field */}
          <div className="flex items-center gap-3">
            <h6 className="font-semibold text-lg">Quantity</h6>
            <div className="flex gap-1">
              <Button onClick={decrement}>-</Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min="1"
                className="w-[100px] text-center"
              />
              <Button onClick={increment}>+</Button>
            </div>
          </div>
          {/* Add to cart Button */}
          <Button className="py-5">
            <FiShoppingCart />
            Add to Cart
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
