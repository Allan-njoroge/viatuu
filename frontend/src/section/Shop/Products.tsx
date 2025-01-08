import ProductCard from "@/components/ProductCard";

const Products = () => {

    const productDetails: { name: string; price: number; category: string }[] = [
        { name: "Nike Low Dunk", price: 20, category: "Men" },
        { name: "Air Force", price: 20, category: "Men" },
        { name: "Nike Air Max Plus SE", price: 20, category: "Men" },
        { name: "Nike Low Dunk", price: 20, category: "Women" },
        { name: "Air Force", price: 20, category: "Women" },
        { name: "Nike Air Max Plus SE", price: 20, category: "Women" },
        { name: "Nike Low Dunk", price: 20, category: "Kids" },
        { name: "Air Force", price: 20, category: "Kids" },
        { name: "Nike Air Max Plus SE", price: 20, category: "Kids" },
        { name: "Nike Low Dunk", price: 20, category: "Kids" },
        { name: "Air Force", price: 20, category: "Kids" },
        { name: "Nike Air Max Plus SE", price: 20, category: "Kids" },
      ];

  return (
    <div className="py-10 md:py-14 px-2 md:px-6 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
        {productDetails.map((item, index) => (
          <>
            <ProductCard
              key={index}
              name={item.name}
              price={item.price}
              category={item.category}
              link={index}
            />
          </>
        ))}
      </div>
  )
}

export default Products