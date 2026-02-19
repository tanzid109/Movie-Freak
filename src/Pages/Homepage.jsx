import { Outlet } from "react-router-dom";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import MovieCard from "../Components/MovieCard";
import UpcomingMovies from "../Components/UpcomingMovies";
const Homepage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900">
      <Navbar></Navbar>
      <main>
        <Banner></Banner>
        {/* <Ban></Ban> */}
        <MovieCard></MovieCard>
        <Outlet></Outlet>
        <UpcomingMovies></UpcomingMovies>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Homepage;
