"use client";
import Link from "next/link";
import Image from "next/image";

const imagePath = "https://image.tmdb.org/t/p/original";
const MovieCard = ({ movie }) => {
  // console.log(movie);
  return (
    <div>
      <h1>{movie.title}</h1>
      <h2>{movie.release_date}</h2>
      <Link href={`/${movie.id}`}>
        <Image
          src={imagePath + movie.poster_path}
          width={500}
          height={500}
          alt={movie.title}
        />
      </Link>
    </div>
  );
};
export default MovieCard;
