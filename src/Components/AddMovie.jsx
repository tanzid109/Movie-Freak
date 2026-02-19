import Navbar from "./Navbar";

const AddMovie = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const rating = form.rating.value;
    const genre = form.genre.value;
    const duration = form.duration.value;
    const year = form.year.value;
    const photo = form.photo.value;
    const movie = { title, rating, genre, duration, year, photo };
    // console.log(movie);
    fetch(`${import.meta.env.VITE_BASE_URL}/movie`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="lg:w-3/4 mx-auto">
        <div className="text-center p-10">
          <h1 className="text-5xl font-bold">Add Movies</h1>
        </div>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            {/* form first row */}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Movie Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Movie name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Genre</span>
                </label>
                <input
                  type="text"
                  name="genre"
                  placeholder="genre"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {/* form second row */}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Duration</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="Movie Duration"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Release Year</span>
                </label>
                <input
                  type="number"
                  name="year"
                  placeholder="Release Year"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {/* form third row */}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <input
                  type="text"
                  name="rating"
                  placeholder="coffee Category"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Summary</span>
                </label>
                <input
                  type="text"
                  name="summary"
                  placeholder="Coffee Details"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo url"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Movie</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
