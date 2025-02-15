import Footer from "@/components/Footer";
import Image from "@/assets/Shoe.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { CartProductItems } from "@/lib/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

type ApiResponse = {
  cart_items: CartProductItems[];
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartProductItems[]>([]);
  const { data, loading, message } = useFetch<ApiResponse>(
    `${import.meta.env.VITE_SERVER_URL}/orders/cart/2`
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (data && typeof data === "object" && "cart_items" in data) {
      setCartItems(data.cart_items);
    }
  }, [data]);

  useEffect(() => {
    let tp: number = 0;
    for (let i = 0; i < cartItems.length; i++) {
      tp += cartItems[i].price;
    }
    setTotalPrice(tp);
  }, [cartItems]);

  // function to removed an item from the cart
  const removeCartItem = async (
    user_id: number,
    product_id: number,
    name: string
  ) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/orders/cart/${user_id}`,
        {
          data: { product_id: product_id },
        }
      );
      toast({
        title: `${name}`,
        description: "Successfully removed from cart",
      });
    } catch (error: any) {
      if (error) {
        return toast({
          title: "Error",
          description: "Failed to remove item from cart",
        });
      }
    }
  };

  // Display this for empty cart
  const EmptyCart = () => (
    <div className="flex justify-center items-center gap-5 text-center min-h-[80vh]">
      <div className="px-10 grid gap-5">
        <h1 className="font-bold text-2xl md:text-3xl my-auto font-[syne] text-primary">
          There is nothing is in your cart
        </h1>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );

  // Display this for a cart that has items inside
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
                <p className="text-muted-foreground text-xs">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm font-semibold">Kes {item.price}</p>
              </div>
              {/* Buttons Section */}
              <div className="absolute bottom-3 md:bottom-5 right-3 md:right-5 flex gap-1 md:gap-3">
                {/* Edit Cart Item Button */}
                <Button className="bg-green-500">
                  <FaEdit />
                  <span className="hidden md:flex">Edit</span>
                </Button>
                {/* Remove Item From Cart Button */}
                <Button
                  onClick={() => removeCartItem(2, item.product_id, item.name)}
                  className="bg-red-500"
                >
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
        {cartItems.length === 0 ? <EmptyCart /> : <OccupiedCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
