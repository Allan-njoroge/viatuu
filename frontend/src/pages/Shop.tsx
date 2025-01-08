import Filters from "@/components/Filters";
import Products from "@/section/Shop/Products";
import Footer from "@/components/Footer";

const Shop = () => {
  return (
    <>
      <Filters />
      <div className="max-w-[1440px] w-full mx-auto pb-20 border-b border-b-muted-foreground/30">
        <Products />
      </div>
      <Footer />
    </>
  );
};

export default Shop;
