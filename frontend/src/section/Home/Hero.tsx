import Shoe from "@/assets/Shoe.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="w-full h-[90vh] md:h-[85vh] flex justify-center items-center relative">
      <img
        src={Shoe}
        alt="Shoe Banner Image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="w-full h-full max-w-[1440px] absolute top-0 right-0 flex items-center justify-center mx-auto text-center">
        <div className="text-center px-5 md:px-10">
          <h1 className="font-bold font-[syne] text-3xl md:text-4xl text-background">
            DAYS CAN'T START WITHOUT PERFECT SHOES
          </h1>
          <Button variant="outline" className="mt-5 text-white bg-transparent px-6 py-3 transition-all">Explore More</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
