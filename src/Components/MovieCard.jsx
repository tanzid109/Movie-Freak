import { Link, useLoaderData } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const MovieCard = () => {
  const data = useLoaderData();

  return (
    <section className="relative py-16 bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <h2
            className="text-3xl md:text-5xl font-extrabold 
          bg-gradient-to-r from-yellow-400 to-orange-500 
          bg-clip-text text-transparent"
          >
            Featured Movies
          </h2>

          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />

          <p className="text-gray-400 text-sm md:text-base">
            Discover trending and recommended movies for you
          </p>
        </div>

        {/* Movie Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {data?.slice(0, 6).map((item) => (
            <CategoryCard key={item._id} item={item} />
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center mt-14">
          <Link
            to="/allmovies"
            className="inline-block px-8 py-3 rounded-2xl font-semibold 
            bg-gradient-to-r from-yellow-400 to-orange-500 text-black
            hover:scale-110 transition duration-300 shadow-lg"
          >
            Explore All Movies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MovieCard;
