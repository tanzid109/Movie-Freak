import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        {error.status || 404} - {error.statusText || "Page Not Found"}
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        {error.message || "The page you are looking for does not exist."}
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn btn-outline text-base rounded-br-2xl rounded-tl-3xl font-medium bg-gradient-to-b from-gray-600 to-gray-900 text-yellow-300 uppercase tracking-wide border-purple-500 shadow-md hover:shadow-white hover:scale-105 hover:text-white transition-transform my-2 w-1/4 mx-auto"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
