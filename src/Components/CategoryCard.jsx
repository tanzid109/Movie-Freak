import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const CategoryCard = ({ item }) => {
    const { _id, poster, title, genre, duration, rating, releaseYear } = item;

    return (
        <div className="group relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

            {/* Poster */}
            <figure className="relative h-[320px] overflow-hidden">
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-yellow-400 text-sm font-semibold">
                    <Star size={16} fill="currentColor" />
                    {rating}
                </div>
            </figure>

            {/* Content */}
            <div className="absolute bottom-0 p-5 w-full text-white">

                <h2 className="text-xl font-bold tracking-wide group-hover:text-yellow-400 transition">
                    {title}
                </h2>

                <div className="flex justify-between text-sm text-gray-300 mt-1">
                    <span>{genre}</span>
                    <span>{releaseYear}</span>
                </div>

                <p className="text-sm text-gray-400 mt-1">
                    {duration} min
                </p>

                {/* Button */}
                <Link
                    to={`/moviedetails/${_id}`}
                    className="mt-4 inline-block w-full text-center py-2 rounded-xl font-semibold 
          bg-gradient-to-r from-yellow-500 to-orange-500 text-black
          hover:from-yellow-400 hover:to-orange-400 transition duration-300"
                >
                    See Details
                </Link>

            </div>
        </div>
    );
};

export default CategoryCard;
