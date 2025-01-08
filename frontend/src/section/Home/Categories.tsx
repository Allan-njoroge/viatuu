import Image from "@/assets/Shoe.jpg"
import { Button } from "@/components/ui/button";

const Categories = () => {
    const categoriesData: { name: string; link:string }[] = [
        { name: "MEN", link: "/" },
        { name: "WOMEN", link: "/" },
        { name: "KIDS", link: "/" }
    ]
  return (
    <div className="py-10 md:py-14 mx-auto">
        <h3 className="font-[syne] font-bold text-center text-2xl">SHOP BY CATEGORY</h3>
        {/* ===== Category Boxex ===== */}
        <div className="flex flex-col sm:flex-row justify-center mt-10 w-1/2 sm:w-3/4 mx-auto gap-5">
            {categoriesData.map((category, index) => (
                <div key={index} className="relative flex items-center justify-center">
                    <img src={ Image } alt="Shoe Image" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                    <div className="absolute top-0 right-0 w-full h-full flex flex-col gap-4 justify-center items-center">
                    <h4 className="md:text-2xl text-background font-[syne] font-bold">{category.name}</h4>
                    <Button variant="outline" className="bg-transparent text-white">SHOP NOW</Button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Categories