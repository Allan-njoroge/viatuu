import Hero from "@/section/Home/Hero"
import Categories from "@/section/Home/Categories"
import Products from "@/section/Home/Products"
import HomeFooter from "@/section/Home/Footer"
import Footer from "@/components/Footer"

const Home = () => {
  return (
    <>
    <Hero/>
    <div className="max-w-[1440px] w-full mx-auto">
      <Categories />
      <Products />
    </div>
    <HomeFooter />
    <Footer />
    </>
  )
}

export default Home