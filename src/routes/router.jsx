import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import AllMovies from "../Components/AllMovies";
import AddMovie from "../Components/AddMovie";
import MyFavourite from "../Components/MyFavourite";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MovieForm from "../Components/MovieForm";
import MovieCard from "../Components/MovieCard";
import MovieDetails from "../Components/MovieDetails";
import PrivateRoute from "./PrivateRoute";
import UpdateMovie from "../Components/UpdateMovie";
import Form from "../Components/Form";
import ErrorPage from "../Components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage></Homepage>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: () => fetch(`${import.meta.env.VITE_BASE_URL}/movie`),
  },
  {
    path: "/allmovies",
    element: <AllMovies></AllMovies>,
    loader: () => fetch(`${import.meta.env.VITE_BASE_URL}/movie`),
  },
  {
    path: "/allmovies/moviedetails/:id",
    element: <MovieDetails></MovieDetails>,
    loader: ({ params }) =>
      fetch(`${import.meta.env.VITE_BASE_URL}/movie/${params.id}`),
  },
  {
    path: "/moviedetails/:id",
    element: <MovieDetails></MovieDetails>,
    loader: ({ params }) =>
      fetch(`${import.meta.env.VITE_BASE_URL}/movie/${params.id}`),
  },
  {
    path: "/addmovie",
    element: (
      <PrivateRoute>
        <MovieForm></MovieForm>
      </PrivateRoute>
    ),
  },
  {
    path: "/updatemovie/:id",
    element: (
      <PrivateRoute>
        <UpdateMovie></UpdateMovie>
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(`${import.meta.env.VITE_BASE_URL}/movie/${params.id}`),
  },
  {
    path: "/myfavourite",
    element: (
      <PrivateRoute>
        <MyFavourite></MyFavourite>
      </PrivateRoute>
    ),
    loader: () => fetch(`${import.meta.env.VITE_BASE_URL}/favmovie`),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/form",
    element: <Form></Form>,
  },
]);
export default router;
