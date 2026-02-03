import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
    Film,
    Clock,
    Calendar,
    Star,
    Image,
    Type,
    FileText,
    Send
} from 'lucide-react';

const MovieForm = () => {
    const [formData, setFormData] = useState({
        poster: '',
        title: '',
        genre: '',
        duration: '',
        releaseYear: '',
        rating: 0,
        summary: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
        'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary'];

    const currentYear = new Date().getFullYear();
    const releaseYears = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString());

    const validate = () => {
        const newErrors = {};

        if (!formData.poster.trim()) {
            newErrors.poster = 'Poster URL is required';
        } else if (!formData.poster.startsWith('http') || !formData.poster.includes('.')) {
            newErrors.poster = 'Please enter a valid URL';
        }

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Title must be at least 2 characters';
        }

        if (!formData.genre) {
            newErrors.genre = 'Please select a genre';
        }

        if (!formData.duration) {
            newErrors.duration = 'Duration is required';
        } else if (parseInt(formData.duration) < 60) {
            newErrors.duration = 'Duration must be at least 60 minutes';
        } else if (parseInt(formData.duration) > 300) {
            newErrors.duration = 'Duration cannot exceed 300 minutes';
        }

        if (!formData.releaseYear) {
            newErrors.releaseYear = 'Release year is required';
        }

        if (formData.rating === 0) {
            newErrors.rating = 'Please rate the movie';
        }

        if (!formData.summary.trim()) {
            newErrors.summary = 'Summary is required';
        } else if (formData.summary.trim().length < 10) {
            newErrors.summary = 'Summary must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/movie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add movie');
            }

            await response.json();

            Swal.fire({
                title: "Success!",
                text: "Movie has been added successfully",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            // Reset form
            setFormData({
                poster: '',
                title: '',
                genre: '',
                duration: '',
                releaseYear: '',
                rating: 0,
                summary: '',
            });

            navigate("/");

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to add movie. Please try again.",
                icon: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold 
          bg-gradient-to-r from-yellow-400 to-orange-500 
          bg-clip-text text-transparent">Add New Movie</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Fill in the details below to add a movie to the collection
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Poster URL */}
                            <div>
                                <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                                    <Image className="w-5 h-5 text-indigo-400" />
                                    Movie Poster URL
                                </label>
                                <input
                                    type="url"
                                    name="poster"
                                    value={formData.poster}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/poster.jpg"
                                    className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${errors.poster ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                />
                                {errors.poster && (
                                    <p className="mt-2 text-sm text-red-400">{errors.poster}</p>
                                )}
                            </div>

                            {/* Movie Title */}
                            <div>
                                <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                                    <Type className="w-5 h-5 text-blue-400" />
                                    Movie Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter movie title"
                                    className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.title ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                />
                                {errors.title && (
                                    <p className="mt-2 text-sm text-red-400">{errors.title}</p>
                                )}
                            </div>

                            {/* Grid Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Release Year */}
                                <div>
                                    <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                                        <Calendar className="w-5 h-5 text-green-400" />
                                        Release Year
                                    </label>
                                    <select
                                        name="releaseYear"
                                        value={formData.releaseYear}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.releaseYear ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                    >
                                        <option value="">Select Year</option>
                                        {releaseYears.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.releaseYear && (
                                        <p className="mt-2 text-sm text-red-400">{errors.releaseYear}</p>
                                    )}
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                                        <Clock className="w-5 h-5 text-yellow-400" />
                                        Duration (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        min="60"
                                        max="300"
                                        placeholder="e.g., 120"
                                        className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${errors.duration ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                    />
                                    {errors.duration && (
                                        <p className="mt-2 text-sm text-red-400">{errors.duration}</p>
                                    )}
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                                        <Star className="w-5 h-5 text-amber-400" />
                                        Rating
                                    </label>
                                    <div className="bg-gray-700 border-2 border-gray-600 rounded-lg p-2.5">
                                        <Rating
                                            onClick={(rate) => {
                                                setFormData(prev => ({ ...prev, rating: rate }));
                                                if (errors.rating) {
                                                    setErrors(prev => ({ ...prev, rating: '' }));
                                                }
                                            }}
                                            ratingValue={formData.rating}
                                            size={30}
                                            transition
                                            fillColor="#fbbf24"
                                            emptyColor="#4b5563"
                                            className="rating-stars"
                                        />
                                    </div>
                                    {errors.rating && (
                                        <p className="mt-2 text-sm text-red-400">{errors.rating}</p>
                                    )}
                                    <div className="mt-2 text-sm text-gray-400">
                                        Selected: {formData.rating}/5
                                    </div>
                                </div>

                                {/* Genre */}
                                <div>
                                    <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                                        <Film className="w-5 h-5 text-purple-400" />
                                        Genre
                                    </label>
                                    <select
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.genre ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                    >
                                        <option value="">Select Genre</option>
                                        {genres.map((genre) => (
                                            <option key={genre} value={genre}>
                                                {genre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.genre && (
                                        <p className="mt-2 text-sm text-red-400">{errors.genre}</p>
                                    )}
                                </div>
                            </div>

                            {/* Summary */}
                            <div>
                                <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                                    <FileText className="w-5 h-5 text-teal-400" />
                                    Movie Summary
                                </label>
                                <textarea
                                    name="summary"
                                    value={formData.summary}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Enter movie summary..."
                                    className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none ${errors.summary ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                />
                                {errors.summary && (
                                    <p className="mt-2 text-sm text-red-400">{errors.summary}</p>
                                )}
                                <div className="mt-2 text-sm text-gray-400 text-right">
                                    {formData.summary.length}/500 characters
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-yellow-400 to-orange-500 text-black
                hover:scale-105 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Adding Movie...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Add Movie to Collection
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Form Tips */}
                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-300 mb-3">Tips:</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Ensure poster URL points to a valid image</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Duration should be in minutes (e.g., 120 for 2 hours)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>Provide a descriptive summary of at least 10 characters</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieForm;