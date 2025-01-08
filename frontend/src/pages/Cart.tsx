import Footer from "@/components/Footer";
import Image from "@/assets/Shoe.jpg";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  const cartItems: { name: string; price: number; category: string }[] = [
    { name: "Nike Low Dunk", price: 20, category: "Men" },
    { name: "Air Force", price: 20, category: "Men" },
    { name: "Nike Air Max Plus SE", price: 20, category: "Men" },
    { name: "Nike Low Dunk", price: 20, category: "Women" },
  ];

  return (
    <>
      <div className="w-full min-h-[50vh] flex justify-center items-center max-w-[1440px] mx-auto px-5 md:px-10">
        <div className="md:w-3/4">
          <h3 className="font-bold text-xl font-[syne]">User's Cart</h3>
          {/* Cart Items */}
          <div className="grid gap-5 py-10">
            {cartItems.map((item, index) => (
              <>
                <div
                  key={index}
                  className="flex p-3 border border-muted-foreground/20 rounded-md  mx-auto gap-5 relative"
                >
                  {/* Image section */}
                  <img
                    src={Image}
                    alt=""
                    className="w-1/3 md:w-1/4 bg-primary rounded-md object-cover"
                  />
                  {/* Details section */}
                  <div className="flex-5 py-2 grid gap02">
                    <h5 className="font-[syne] text-lg md:text-xl font-bold">
                      {item.name}
                    </h5>
                    <p className="text-muted-foreground text-sm">Quantity: 2</p>
                    <p className="text-md font-semibold">Kes {item.price}</p>
                  </div>
                  {/* Buttons Section */}
                  <div className="absolute bottom-3 md:bottom-5 right-3 md:right-5 flex gap-3">
                    <Button className="bg-green-500">
                      <FaEdit />
                      <span className="hidden md:flex">Edit</span>
                    </Button>
                    <Button className="bg-red-500">
                      <MdDeleteOutline />
                      <span className="hidden md:flex">Remove</span>
                    </Button>
                  </div>
                </div>
              </>
            ))}
          </div>
          {/* Checkout Section */}
          <div className="grid gap-3 my-10">
            <h5 className="font-[syne] text-xl md:text-2xl">
              <span className="font-semibold">Total Price: </span>Kes 100
            </h5>
            <Button className="py-5">Checkout</Button>
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default Cart;
