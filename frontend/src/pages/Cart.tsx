import Footer from "@/components/Footer";
import Image from "@/assets/Shoe.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  const cartItems: { name: string; price: number; category: string }[] = [
    { name: "Nike Low Dunk", price: 20, category: "Men" },
    { name: "Air Force", price: 20, category: "Men" },
    { name: "Nike Air Max Plus SE", price: 20, category: "Men" },
    { name: "Nike Low Dunk", price: 20, category: "Women" },
  ];

  const EmptyCart = () => (
    <div className="grid gap-5 text-center">
      <h1 className="font-bold text-2xl md:text-3xl my-auto font-[syne] text-primary">
        There is nothing is in your cart
      </h1>
      <Link to="/shop">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  )

  const OccupiedCart = () => (
    <div className="md:w-3/4">
      <h3 className="font-bold text-xl font-[syne]">User's Cart</h3>
      {/* Cart Items */}
      <div className="grid gap-5 py-10">
        {cartItems.map((item, index) => (
          <>
            <div
              key={index}
              className="flex p-1 md:p-3 border border-muted-foreground/20 rounded-md  mx-auto gap-5 relative"
            >
              {/* Image section */}
              <img
                src={Image}
                alt=""
                className="w-1/3 md:w-1/4 bg-primary rounded-md object-cover"
              />
              {/* Details section */}
              <div className="flex-5 py-2 grid gap02">
                <h5 className="font-[syne] text-md md:text-xl font-bold">
                  {item.name}
                </h5>
                <p className="text-muted-foreground text-xs">Quantity: 2</p>
                <p className="text-sm font-semibold">Kes {item.price}</p>
              </div>
              {/* Buttons Section */}
              <div className="absolute bottom-3 md:bottom-5 right-3 md:right-5 flex gap-1 md:gap-3">
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
        <Link to="/checkout">
          <Button className="py-5 w-full">Proceed to Checkout</Button>
        </Link>
        
      </div>
    </div>
  )

  return (
    <>
      <div className="w-full min-h-[50vh] flex justify-center items-center max-w-[1440px] mx-auto px-5 md:px-10">
        {/* ===== No Items in the cart */}
        {/* <EmptyCart /> */}
        {/* ===== If there are items in the cart =====*/}
        <OccupiedCart />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
