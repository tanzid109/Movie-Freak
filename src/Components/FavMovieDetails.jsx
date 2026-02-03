import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Trash2, Star, Clock, Calendar, Film, Tag } from 'lucide-react';

const FavMovieDetails = ({ movie, movies, setMovies, index }) => {
    const { _id, poster, title, genre, releaseYear, duration, rating, summary } = movie;
    const navigate = useNavigate();

    const handleDelete = async (_id) => {
        const result = await Swal.fire({
            title: "Remove from Favorites?",
            text: "This will remove the movie from your favorites list",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7c3aed",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, remove it",
            cancelButtonText: "Cancel",
            background: '#1f2937',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/favmovie/${_id}`, {
                    method: 'DELETE',
                });

                const data = await response.json();

                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Removed!",
                        text: "Movie has been removed from favorites",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        background: '#1f2937',
                        color: '#fff'
                    });

                    const remaining = movies.filter(mov => mov._id !== _id);
                    setMovies(remaining);
                    navigate("/myfavourite");
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to remove movie. Please try again.",
                    icon: "error",
                    background: '#1f2937',
                    color: '#fff'
                });
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: index * 0.1,
                duration: 0.4
            }
        }
    };

    return (
        <div className=''>
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
                    <button
                        onClick={() => handleDelete(_id)}
                        className="mt-4 inline-block w-full text-center py-2 rounded-xl font-semibold 
          bg-gradient-to-r from-yellow-500 to-orange-500 text-black
          hover:from-yellow-400 hover:to-orange-400 transition duration-300"
                    >
                        <Trash2 className="inline mr-2" /> Remove
                    </button>

                </div>
            </div>
        </div>
    );
};

export default FavMovieDetails;