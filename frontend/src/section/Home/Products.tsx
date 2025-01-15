import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";


type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  image_url?: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
}


const Products = () => {
  const { data, loading, message } = useFetch('http://localhost:8000/api/products/')
  const products: Product[] = data?.products

  if(loading) {
    return <div>Loading...</div>
  }

  if(message) {
    return <div>{message}</div>
  }


  return (
    <div className="py-10 md:py-14 px-2 md:px-6 w-full grid">
      <h3 className="font-[syne] font-bold text-center text-2xl">PRODUCTS</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
        {products.map((item) => (
          <>
            <ProductCard
              key={item.id}
              name={item.name}
              price={item.price}
              category={item.category}
              link={`product/${item.id}`}
            />
          </>
        ))}
      </div>

      <Button className="mx-auto text-center mt-10 md:mt-14">
        <Link to="/shop">Shop More</Link>
      </Button>
    </div>
  );
};

export default Products;
