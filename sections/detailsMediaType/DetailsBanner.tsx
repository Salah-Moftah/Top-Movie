"use client";

import { useState } from "react";
import { DetailsButton, WatchlistButton, VideoModel } from "@/components";
import { DetailsBannerProps } from "@/types/types";
import dayjs from "dayjs";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { findCertification } from "..";
import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="w-full relative">
      <div
        className="md:px-padding px-5 mx-auto pt-28
        flex items-start md:items-center gap-14 relative lg:w-[90%]
        flex-col md:flex-row mb-20"
      >
        <div className="sm:max-w-[300px] w-full">
          <div className="sm:max-w-[300px] w-full h-[450px]">
            <Skeleton height={450} />
          </div>
          <div className="mt-5 sm:max-w-[300px] w-full">
            <Skeleton
              containerClassName="flex gap-2 h-[45px]"
              count={2}
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div className="flex-1">
          <Skeleton height={35} width={270} className="mb-4" />
          <Skeleton height={25} width={240} className="mb-6" />
          <Skeleton height={28} width={150} className="mb-4" />
          <Skeleton
            className="mb-3"
            count={4}
            width="100%"
          />
          <Skeleton height={28} width={150} className="mb-4" />
          <Skeleton
            className="mb-3"
            count={4}
            height={28}
            width="80%"
          />
        </div>
      </div>
    </div>
  )
}

function DetailsBanner({ data, mediaType, crew, loading }: DetailsBannerProps) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  
  const directors = crew.filter((member) => member.job === "Director");
  const writers = crew.filter((member) => member.job === "Writer");

  const liDetails = (name: string, data: any) => {
    return (
      <li
        className="lg:flex-2 flex-[100%] items-center gap-2 border-b border-[#ffffff1a] leading-10 flex"
      >
        <span className="font-semibold text-lg">{name}: </span>
        <span className="text-gray-400 flex items-center gap-3 line-clamp-1">
          {data}
        </span>
      </li>
    );
  };
  
  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="w-full relative">
      {loading && data !== null ?
      <>
        <div className="h-[100vh] absolute left-0 top-0 w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            fill
            alt={data.title || data.name || data.original_title}
            className={`overflow-hidden opacity-10 md:object-fill object-cover`}
          />
          <div
            className="gradient-bottom w-full h-[250px] 
          absolute -bottom-1 left-0"
          />
        </div>
        <div
          className="md:px-padding px-5 mx-auto pt-28
        flex items-center gap-14 relative lg:w-[90%]
        flex-col md:flex-row mb-20"
        >
          <div className="flex-shrink-0">
            <div className="relative overflow-hidden">
              <Image
                src={data.poster_path !== null ? `https://image.tmdb.org/t/p/original/${data.poster_path}` : '/no-poster.png'}
                alt={`${data.title || data.name || data.original_title}`}
                width={500}
                height={500}
                priority
                className="sm:max-w-[300px] w-full rounded-2xl blur-lg transition-all duration-300"
                onLoadingComplete={(image) => image.classList.remove('blur-lg')}
              />
              <div className="flex justify-start gap-3 items-center mt-5">
                <DetailsButton
                  title="Watch Trailer"
                  styles="w-[40%]"
                  setShow={setShow}
                  setVideoId={setVideoId}
                  videoKey={data ? data.videos.results[0]?.key : null}
                />
                <WatchlistButton styles="w-[60%]" name={data.title || data.name || data.original_title} mediaType={mediaType} id={data.id} />
              </div>
            </div>
          </div>
          <div className="text-white lg:text-start text-start">
            <div className="mb-4">
              <div className="flex items-start gap-2">
                <h1 className="md:text-4xl text-3xl mb-1 line-clamp-2 font-semibold">
                  {data.title || data.name || data.original_title}
                </h1>
                <div className="border border-gray-400 p-1 rounded-sm w-fit text-xs text-gray-200">
                  {findCertification(data)}
                </div>
              </div>
              <p className="text-base sm:text-lg text-gray-400 italic">
                {data.tagline}
              </p>
            </div>
            <div className="flex gap-2 items-center text-xl font-medium mb-4">
            <FaStar className="text-2xl text-yellow-300" />
            {data.vote_average.toFixed(1)} Rating
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-3">Overview :</h2>
              <p className="p-3 bg-[#0a295572] rounded-2xl">{data.overview}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3">
                {`${mediaType === "movie" ? "Movie" : "Series"} details :`}
              </h2>
              <ul className="flex flex-wrap w-full">
                {liDetails("Status", data.status)}
                {liDetails(
                  "Genre",
                  data.genres
                    ?.map((genre) => <div key={genre.id}>{genre.name}</div>)
                    .slice(0, 4)
                )}
                {liDetails(
                  "Release Date",
                  dayjs(data.release_date).format("MMM D, YYYY")
                )}
                {liDetails("Runtime", toHoursAndMinutes(data.runtime))}
                {liDetails(
                  `${mediaType === "movie" ? "Movie" : "Series"} country`,
                  data.production_countries?.map((p: { name: string }) => p.name).slice(0, 1)
                )}
                {liDetails(
                  `${mediaType === "movie" ? "Movie" : "Series"} language`,
                  data.spoken_languages?.map((d: { name: string }, i: number) => (
                    <span key={i}>
                      {d.name}
                      {writers.length - 1 !== i && ", "}
                    </span>
                  ))
                )}
                {directors?.length > 0 &&
                liDetails(
                  "Directors",
                  directors?.map((d, i) => (
                    <span key={i}>
                      {d.name}
                      {directors.length - 1 !== i && ", "}
                    </span>
                  ))
                )}
                {writers?.length > 0 &&
                  liDetails(
                    "Writers",
                    writers?.map((w, i) => (
                      <span key={i}>
                        {w.name}
                        {writers.length - 1 !== i && ", "}
                      </span>
                    ))
                  )}
              </ul>
            </div>
          </div>
        </div>
        <VideoModel
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </>
      : 
      <LoadingSkeleton />
      }
    </div>
  );
}

export default DetailsBanner;
