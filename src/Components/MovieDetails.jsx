import { useLoaderData, useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { Star, Clock, Calendar } from "lucide-react";

const MovieDetails = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const { _id, poster, title, genre, releaseYear, duration, rating, summary } =
    data;

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Delete Movie?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_BASE_URL}/movie/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Movie removed successfully", "success");
              navigate("/allmovies");
            }
          });
      }
    });
  };

  const handleFavourite = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/favmovie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          poster,
          title,
          genre,
          releaseYear,
          duration,
          rating,
        }),
      });

      Swal.fire("Added!", "Movie added to favourites", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Hero Background */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 py-16 flex flex-col lg:flex-row gap-10 items-center">
          {/* Poster */}
          <div className="flex-1">
            <img
              src={poster}
              alt={title}
              className="rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
              {title}
            </h1>

            {/* Info Badges */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                🎬 {genre}
              </span>

              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock size={16} /> {duration} min
              </span>

              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Calendar size={16} /> {releaseYear}
              </span>

              <span className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold">
                <Star size={16} fill="currentColor" /> {rating}
              </span>
            </div>

            {/* Summary */}
            <p className="text-gray-300 leading-relaxed">{summary}</p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => handleDelete(_id)}
                className="px-6 py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-red-500 to-red-700 
                hover:scale-105 transition duration-300 shadow-lg"
              >
                Delete Movie
              </button>

              <button
                onClick={handleFavourite}
                className="px-6 py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-yellow-400 to-orange-500 text-black
                hover:scale-105 transition duration-300 shadow-lg"
              >
                Add To Favourite
              </button>

              <Link
                to={`/updatemovie/${_id}`}
                className="px-6 py-3 rounded-xl font-semibold 
                bg-white/10 hover:bg-white/20 
                transition duration-300 shadow-lg"
              >
                Update Movie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
