import React, { useEffect, useState, useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import CategoryCard from "./CategoryCard";
import { Search, Filter, Loader2, Film, AlertCircle } from "lucide-react";

const AllMovies = () => {
  const initialMovies = useLoaderData();
  const [movies, setMovies] = useState(initialMovies);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch movies with debounced search
  const fetchMovies = useCallback(async () => {
    if (!debouncedSearch.trim()) {
      setMovies(initialMovies);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/movie?search=${encodeURIComponent(debouncedSearch)}`,
      );

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching movies:", err);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, initialMovies]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Sort movies
  const sortedMovies = React.useMemo(() => {
    const moviesCopy = [...movies];

    switch (sortBy) {
      case "title":
        return moviesCopy.sort((a, b) => a.title.localeCompare(b.title));
      case "year":
        return moviesCopy.sort((a, b) => b.year - a.year);
      case "rating":
        return moviesCopy.sort((a, b) => b.rating - a.rating);
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <div className="container mx-auto px-4 py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Film className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              Movie Collection
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Discover amazing movies from our extensive collection
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
                placeholder="Search movies by title, director, or genre..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-12 pr-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="latest">Latest</option>
                <option value="title">Title A-Z</option>
                <option value="year">Year</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Search Stats */}
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching...
                </span>
              ) : (
                `Found ${sortedMovies.length} movie${sortedMovies.length !== 1 ? "s" : ""}`
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
                  <p className="font-semibold text-red-300">
                    Error loading movies
                  </p>
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
              <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-gray-400">Loading movies...</p>
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
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CategoryCard
                    movie={item}
                    setMovie={setMovies}
                    item={item}
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
            <Film className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">
              No movies found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for
            </p>
          </motion.div>
        )}

        {/* Floating Total Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-2xl backdrop-blur-sm"
        >
          <span className="font-bold">{sortedMovies.length}</span> movies
        </motion.div>
      </div>
    </div>
  );
};

export default AllMovies;
