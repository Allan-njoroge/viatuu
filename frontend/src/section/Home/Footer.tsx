import Image from "@/assets/Shoe.jpg";

const Footer = () => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center relative">
      <img
        src={Image}
        alt="Shoe Banner Image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="w-full h-full max-w-[1440px] absolute top-0 right-0 flex items-center justify-center">
        <div className="text-center px-5 md:px-10">
          <h1 className="font-bold font-[syne] text-3xl md:text-4xl text-background w-1/2 text-center mx-auto">
            FIND YOUR FAVOURITES AND TAKE THE FIRST STEP TOWARDS SNEAKING
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Footer