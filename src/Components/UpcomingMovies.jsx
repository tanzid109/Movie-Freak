const upcomingMovies = [
  {
    title: "Transformers",
    date: "2025-06-22",
    image: "https://i.ibb.co.com/ySRykTr/transformers-age-of-extinction.jpg",
    summary: "High-school student Sam Witwicky buys his first car...",
  },
  {
    title: "What If",
    date: "2026-07-22",
    image: "https://i.ibb.co.com/d6QQtBv/what-if-season.jpg",
    summary: "Exploring pivotal moments from Marvel Universe...",
  },
  {
    title: "The Way We Speak",
    date: "2027-02-18",
    image: "https://i.ibb.co.com/3fbzF5g/the-way-we-speak.jpg",
    summary: "An up-and-coming writer refuses to leave spotlight...",
  },
  {
    title: "Kraven The Hunter",
    date: "2025-08-21",
    image: "https://i.ibb.co.com/pW1z08g/kraven-the-hunter.jpg",
    summary: "Russian immigrant Sergei Kravinoff mission...",
  },
  {
    title: "Canadian Sniper",
    date: "2025-07-17",
    image: "https://i.ibb.co.com/FwjM2sy/canadian-sniper.jpg",
    summary: "Army sniper struggles to reintegrate civilian life...",
  },
];

const UpcomingMovies = () => {
  return (
    <section className="relative py-16 bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-90" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-extrabold 
          bg-gradient-to-r from-yellow-400 to-orange-500 
          bg-clip-text text-transparent"
          >
            Upcoming Movies
          </h2>

          <div
            className="w-24 h-1 mx-auto mt-4 
          bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          />
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcomingMovies.map((movie, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden 
              shadow-xl hover:-translate-y-2 transition duration-500"
            >
              {/* Poster */}
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-[350px] object-cover 
                group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 
              bg-gradient-to-t from-black via-black/40 to-transparent"
              />

              {/* Content */}
              <div className="absolute bottom-0 p-5 space-y-2">
                <h3
                  className="text-xl font-bold 
                group-hover:text-yellow-400 transition"
                >
                  {movie.title}
                </h3>

                <span className="text-sm text-yellow-400 font-semibold">
                  Release: {movie.date}
                </span>

                <p
                  className="text-sm text-gray-300 opacity-0 
                group-hover:opacity-100 transition duration-500"
                >
                  {movie.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMovies;
