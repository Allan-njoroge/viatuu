import Footer from "@/components/Footer";
import Image from "@/assets/Shoe.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { CartProductItems } from "@/lib/types";

type ApiResponse = {
  cart_items: CartProductItems[]
}

const Cart = () => {

  const [cartItems, setCartItems] = useState<CartProductItems[]>([]);
  const { data, loading, message } = useFetch<ApiResponse>(
    "http://localhost:8000/api/orders/cart/2"
  );
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    if (data && typeof data === "object" && "cart_items" in data) {
      setCartItems(data.cart_items);
    }
  }, [data]);

  useEffect(() => {
    let tp: number = 0
    for(let i=0; i<cartItems.length; i++) {
      tp+=cartItems[i].price
    }
    setTotalPrice(tp) 
  }, [cartItems])

  // Display this for empty cart
  const EmptyCart = () => (
    <div className="flex justify-center items-center gap-5 text-center min-h-[80vh]">
      <div className="px-10 grid gap-5">
        <h1 className="font-bold text-2xl md:text-3xl my-auto font-[syne] text-primary">
          There is nothing is in your cart
          {message}
        </h1>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );

  // Display this for an occupied Cart
  const OccupiedCart = () => (
    <div className="md:w-3/4">
      <h3 className="font-bold text-xl font-[syne]">User's Cart</h3>
      {/* Cart Items */}
      <div className="grid gap-5 py-10">
        {cartItems.map((item) => (
            <div key={item.product_id}>
              <div
                key={item.product_id}
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
                  <p className="text-muted-foreground text-xs">Quantity: {item.quantity}</p>
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
            </div>
          ))}
      </div>
      {/* Checkout Section */}
      <div className="grid gap-3 my-10">
        <h5 className="font-[syne] text-xl md:text-2xl">
          <span className="font-semibold">Total Price: </span>Kes {totalPrice}
        </h5>
        <Link to="/checkout">
          <Button className="py-5 w-full">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full min-h-[50vh] flex justify-center items-center max-w-[1440px] mx-auto px-5 md:px-10">
        {cartItems.length === 0 ? <EmptyCart/> : <OccupiedCart/>}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
