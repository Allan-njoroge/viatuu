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

const Hero = () => {
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
          <p className="text-muted-foreground">Men's Shoes</p>
          <h3 className="text-2xl md:text-3xl font-bold font-[syne]">Nike Low Dunk</h3>
        </div>
        {/* Description field */}
        <div className="my-8 grid gap-2">
          <h5 className="font-semibold text-xl">Product Description</h5>
          <p className="text-muted-foreground pl-2 leading-7 text-sm md:text-md">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
            laboriosam ipsam at suscipit iusto molestias labore, non voluptatum
            necessitatibus harum magni vero earum molestiae, ducimus nobis dolor
            assumenda! Distinctio repellendus quis odit! Dolorem, reprehenderit
            doloribus. Eaque provident iusto tenetur veniam error at ab
            accusantium quibusdam esse
          </p>
        </div>
        {/* Form fields */}
        <form className="grid gap-5">
          {/* Size field */}
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
          </div>
          {/* Quantity Field */}
          <div className="flex items-center gap-3">
            <h6 className="font-semibold text-lg">Quantity</h6>
            <div className="flex gap-1">
              <Button>-</Button>
              <Input type="number" min="1" className="w-[100px] text-center" />
              <Button>+</Button>
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
