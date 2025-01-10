import Footer from "@/components/Footer";

const Checkout = () => {
  const cartItems: { name: string; price: number; category: string }[] = [
    { name: "Nike Low Dunk", price: 20, category: "Men" },
    { name: "Air Force", price: 20, category: "Men" },
    { name: "Nike Air Max Plus SE", price: 20, category: "Men" },
    { name: "Nike Low Dunk", price: 20, category: "Women" },
  ];

  return (
    <>
      <div className="max-w-[1440px] w-full mx-auto flex justify-center py-10 items-center">
        <div className="w-full px-5">
          <h3 className="font-bold text-2xl md:text-3xl my-auto font-[syne] text-primary text-left w-full md:w-3/4 px-5 mx-auto">
            Checkout
          </h3>
          <div className="grid md:grid-cols-2 mx-auto gap-5">
            Yet to come
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
