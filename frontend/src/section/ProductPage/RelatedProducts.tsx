import ProductCard from "@/components/ProductCard";

const RelatedProducts = () => {
  const productDetails: { name: string; price: number; category: string }[] = [
    { name: "Nike Low Dunk", price: 20, category: "Men" },
    { name: "Air Force", price: 20, category: "Men" },
    { name: "Nike Air Max Plus SE", price: 20, category: "Men" },
    { name: "Nike Low Dunk", price: 20, category: "Women" },
  ];

  return (
    <div className="relative w-full py-10 md:py-14 px-2 md:px-6 mt-10">
        <h3 className="text-2xl md:text-3xl font-bold font-[syne]">Related Products</h3>
      <div className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-5 py-5 w-full">
        {productDetails.map((item, index) => (
          <ProductCard
            key={index}
            name={item.name}
            price={item.price}
            category={item.category}
            link={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
