import { useEffect, useState } from "react";
import image1 from "../assets/aquaman.jpg";
import image2 from "../assets/Batman.jpg";
import image3 from "../assets/BlackAdam.jpg";
import image4 from "../assets/Superman.jpg";

const slides = [
    {
        id: "slide1",
        image: image1,
        title: "Aquaman",
        description: "Dive into the underwater kingdom adventure",
    },
    {
        id: "slide2",
        image: image2,
        title: "Batman",
        description: "The Dark Knight rises to protect Gotham",
    },
    {
        id: "slide3",
        image: image3,
        title: "Black Adam",
        description: "Power born from ancient legends",
    },
    {
        id: "slide4",
        image: image4,
        title: "Superman",
        description: "The symbol of hope and justice",
    },
];

const Banner = () => {
    const [current, setCurrent] = useState(0);

    // ✅ Auto sliding
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-8 w-11/12 mx-auto">
            <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">

                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0"
                            }`}
                    >
                        {/* Image */}
                        <img
                            src={slide.image}
                            className="w-full h-full object-cover"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                        {/* Text Content */}
                        <div className="absolute top-1/2 left-10 md:left-20 transform -translate-y-1/2 text-white max-w-lg space-y-4">
                            <h1 className="text-3xl md:text-5xl font-bold">
                                {slide.title}
                            </h1>

                            <p className="text-gray-200">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;
