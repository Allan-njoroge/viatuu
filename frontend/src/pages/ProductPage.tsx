import Footer from "@/components/Footer"
import Hero from "@/section/ProductPage/Hero"
import RelatedProducts from "@/section/ProductPage/RelatedProducts"

const ProductPage = () => {
  return (
    <>
    <div className="max-w-[1440px] w-full mx-auto py-10">
      <Hero />
      <RelatedProducts />
    </div>
    <Footer />
    </>
  )
}

export default ProductPage