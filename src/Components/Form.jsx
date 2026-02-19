import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Star,
  MessageSquare,
  User,
  Mail,
  Sparkles,
  CheckCircle,
  Loader2,
} from "lucide-react";

const Form = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    Swal.fire({
      title: "🎉 Thank You!",
      text: "Your feedback has been received successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      background: "#1a1a2e",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl",
        title:
          "text-gradient bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent",
      },
    });

    setIsSubmitting(false);
    reset();
    setSelectedRating(0);
    navigate("/");
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setValue("rating", rating, { shouldValidate: true });
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => handleRatingClick(star)}
        onMouseEnter={() => setHoveredRating(star)}
        onMouseLeave={() => setHoveredRating(0)}
        className="transition-all duration-300 transform hover:scale-125"
      >
        <Star
          className={`w-10 h-10 ${
            star <= (hoveredRating || selectedRating || watch("rating") || 0)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-400"
          } transition-all duration-300`}
        />
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black">
      <Navbar />

      <div className="relative z-10 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 
          bg-clip-text text-transparent mb-4"
          >
            Share Your Thoughts
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your feedback helps us create a better experience for everyone
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative p-8 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group"
                >
                  <label className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-200">
                    <User className="w-5 h-5 text-cyan-400" />
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 pl-12 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 
                                                focus:outline-none focus:border-cyan-500 transition-all duration-300
                                                ${errors.name ? "border-red-500" : "border-gray-700"}`}
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                      >
                        ⚠️ {errors.name.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="group"
                >
                  <label className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-200">
                    <Mail className="w-5 h-5 text-purple-400" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 pl-12 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 
                                                focus:outline-none focus:border-purple-500 transition-all duration-300
                                                ${errors.email ? "border-red-500" : "border-gray-700"}`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                      >
                        ⚠️ {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Rating Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="group"
                >
                  <label className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-200">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Your Rating
                  </label>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {renderStars()}
                  </div>
                  <input
                    type="hidden"
                    {...register("rating", {
                      required: "Please select a rating",
                      min: { value: 1, message: "Minimum rating is 1" },
                    })}
                  />
                  <AnimatePresence>
                    {errors.rating && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-400 text-center flex items-center justify-center gap-1"
                      >
                        ⚠️ {errors.rating.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="group"
                >
                  <label className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-200">
                    <MessageSquare className="w-5 h-5 text-pink-400" />
                    Your Feedback
                  </label>
                  <textarea
                    placeholder="Share your thoughts, suggestions, or experiences..."
                    rows="5"
                    className={`w-full px-4 py-3 bg-gray-800/50 border-2 rounded-xl text-white placeholder-gray-400 
                                            focus:outline-none focus:border-pink-500 transition-all duration-300 resize-none
                                            ${errors.message ? "border-red-500" : "border-gray-700"}`}
                    {...register("message", {
                      required: "Feedback is required",
                      minLength: {
                        value: 20,
                        message: "Please provide at least 20 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Feedback must be less than 500 characters",
                      },
                    })}
                  />
                  <div className="flex justify-between mt-2">
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-400 flex items-center gap-1"
                        >
                          ⚠️ {errors.message.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span
                      className={`text-sm ${
                        (watch("message")?.length || 0) > 450
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {watch("message")?.length || 0}/500
                    </span>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-yellow-400 to-orange-500 text-black
                hover:scale-105 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                    <span className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          Submit Feedback
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>

                {/* Form Validation Success */}
                {!Object.keys(errors).length &&
                  watch("name") &&
                  watch("email") &&
                  watch("message") && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 text-green-400 mt-4"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>All fields look good!</span>
                    </motion.div>
                  )}
              </form>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mt-8 text-gray-400 text-sm"
          >
            <p>We appreciate your time and valuable feedback!</p>
            <p className="mt-1">
              All responses are confidential and used to improve our services.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Form;
