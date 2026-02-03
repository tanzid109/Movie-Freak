import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderData } from 'react-router-dom';
import Navbar from './Navbar';
import FavMovieDetails from './FavMovieDetails';
import { Heart, Filter, Loader2, AlertCircle, Search, Star } from 'lucide-react';

const MyFavourite = () => {
    const initialMovies = useLoaderData();
    const [movies, setMovies] = useState(initialMovies);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('latest');
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Fetch favorite movies with search
    const fetchFavorites = useCallback(async () => {
        if (!debouncedSearch.trim()) {
            // If no search, use loader data
            setMovies(initialMovies);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/favmovie?search=${encodeURIComponent(debouncedSearch)}`
            );

            if (!response.ok) throw new Error('Failed to fetch favorite movies');

            const data = await response.json();
            setMovies(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching favorite movies:', err);
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch, initialMovies]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    // Sort movies
    const sortedMovies = React.useMemo(() => {
        const moviesCopy = [...movies];

        switch (sortBy) {
            case 'title':
                return moviesCopy.sort((a, b) => a.title.localeCompare(b.title));
            case 'year':
                return moviesCopy.sort((a, b) => b.releaseYear - a.releaseYear);
            case 'rating':
                return moviesCopy.sort((a, b) => b.rating - a.rating);
            case 'duration':
                return moviesCopy.sort((a, b) => b.duration - a.duration);
            default:
                return moviesCopy;
        }
    }, [movies, sortBy]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="container mx-auto px-4 py-5 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 
          bg-clip-text text-transparent mb-4">
                            My Favorite Movies
                        </h1>
                        <p className="text-gray-300 text-lg mb-2 max-w-2xl mx-auto">
                            Your personal collection of beloved movies
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto mb-12"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search your favorite movies..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-12 pr-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            >
                                <option value="latest">Recently Added</option>
                                <option value="title">Title A-Z</option>
                                <option value="year">Release Year</option>
                                <option value="rating">Rating</option>
                                <option value="duration">Duration</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Stats */}
                    <div className="mt-4 text-center">
                        <p className="text-gray-400">
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Searching favorites...
                                </span>
                            ) : (
                                <>
                                    <Heart className="w-4 h-4 inline mr-2 text-red-400" />
                                    {sortedMovies.length} favorite movie{sortedMovies.length !== 1 ? 's' : ''}
                                </>
                            )}
                        </p>
                    </div>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-2xl mx-auto mb-8"
                        >
                            <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <div>
                                    <p className="font-semibold text-red-300">Error loading favorites</p>
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Movies Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-red-400 mx-auto mb-4" />
                            <p className="text-gray-400">Loading your favorites...</p>
                        </div>
                    </div>
                ) : sortedMovies.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                    >
                        <AnimatePresence mode="wait">
                            {sortedMovies.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FavMovieDetails
                                        key={item._id}
                                        movie={item}
                                        movies={movies}
                                        setMovies={setMovies}
                                        index={index}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Heart className="w-20 h-20 mx-auto mb-4 text-gray-600" />
                        <h3 className="text-2xl font-semibold text-gray-400 mb-2">
                            No favorite movies yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Start building your collection by adding movies to favorites
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all"
                        >
                            Browse Movies
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MyFavourite;