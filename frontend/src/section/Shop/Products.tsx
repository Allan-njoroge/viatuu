import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Image from "@/assets/Shoe.jpg"
import { useLocation } from "react-router";

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

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [url, setUrl] = useState<string>("")
  const { data, loading, message } = useFetch(url)

  const location = useLocation()
  const path = location.pathname
  const pathItems = path.split("/")

  useEffect(() => {
    if(pathItems.length>1 && pathItems[2]) {
      setUrl(`${import.meta.env.VITE_SERVER_URL}/products/${pathItems[2]}`)
    } else {
      setUrl(`${import.meta.env.VITE_SERVER_URL}/products/`)
    }
  }, [path])

  useEffect(() => {
    if (data && data.products && Array.isArray(data.products)) {
      setProducts(data?.products)
    }
  }, [data])
  

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (message) {
    return <div>{message}</div>;
  }

  if(products.length < 1) {
    return <div>No products founds</div>
  }

  return (
    <div className="py-10 md:py-14 px-2 md:px-6 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product_id={item.id}
          image={item.image_url || Image}
          name={item.name}
          price={item.price}
          category={item.category}
          link={`/product/${item.id}`}
        />
      ))}
    </div>
  );
};

export default Products;