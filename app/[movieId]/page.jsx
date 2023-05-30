import Image from "next/image";

export const revalidate = 60;

export const generateStaticParams = async () => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const response = await data.json();
  return response.results.map((movie) => ({
    movie: toString(movie.id),
  }));
};

const MovieDetail = async ({ params }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.API_KEY}`
  );
  const response = await data.json();
  const title = response.original_title;
  const imgSrc = response.backdrop_path;
  const overview = response.overview;
  const genres = response.genres.map((genre) => genre.name);
  const releaseDate = response.release_date;
  const runTime = response.runtime;
  const releasedStatus = response.status;

  console.log(genres);
  return (
    <div>
      <div>
        <h2 className="text-2xl">{title}</h2>
        <h2 className="text-lg">{releaseDate}</h2>
        <h2>Runtime: {runTime} minutes</h2>
        <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md">
          {releasedStatus}
        </h2>
        <Image
          src={imagePath + imgSrc}
          alt={title}
          width={1000}
          height={1000}
          className="my-12 w-full"
          priority
        />
        <p>{overview}</p>
        <br />
        <h3>Genres:</h3>
        {genres.map((genre) => (
          <span>{genre} </span>
        ))}
      </div>
    </div>
  );
};
export default MovieDetail;
