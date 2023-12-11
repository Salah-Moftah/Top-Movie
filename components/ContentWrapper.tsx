"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { PiDotOutlineFill } from "react-icons/pi";
import { ContentWrapperProps } from "@/types/types";
import { DetailsButton, WatchlistButton, findGenre } from "@/components";
import Skeleton from "react-loading-skeleton";

function ContentWrapper({
  data,
  genres,
  styles,
  overview,
  loading,
  isMovieOrTv,
}: ContentWrapperProps) {
  return (
    <div
      className={`${styles} sm:px-padding px-5
      text-[#f5f5f5] lg:text-start text-start
      w-full`}
    >
      <h1 className="font-bold md:text-4xl text-3xl mb-3 line-clamp-2 max-w-[450px]">
        {loading ? (
          data.title || data.name || data.original_title || data.original_name
        ) : (
          <Skeleton height={35} width={320} />
        )}
      </h1>
      <p className="text-sm mb-3 flex justify-start gap-3 items-center font-semibold">
        {loading ? (
          <>
            <Image
              src="/pngwing.com.png"
              alt="imdb"
              height={20}
              width={40}
              className="h-[20px] w-[40px] rounded-md"
            />
            {`${data.vote_average.toFixed(1)} Rating`}
          </>
        ) : (
          <Skeleton height={20} width={170} />
        )}
      </p>
      <div className="flex justify-start mb-5 items-center">
        {loading ? (
          <>
            {data.release_date && (
              <span className="text-sm text-gray-400">
                {dayjs(data.release_date).format("MMM D, YYYY")}
              </span>
            )}
            <span className="text-base text-gray-400">
              <PiDotOutlineFill />
            </span>
            <span className="text-sm text-gray-400">
              {findGenre(data.genre_ids, genres)[0]?.name}
            </span>
            <span className="text-base text-gray-400">
              <PiDotOutlineFill />
            </span>
            <span className="text-sm text-gray-400">
              {findGenre(data.genre_ids, genres)[1]?.name}
            </span>
          </>
        ) : (
          <Skeleton height={20} width={240} />
        )}
      </div>
      {overview && (
        <p
          className="md:text-base text-sm mb-3 line-clamp-3 font-semibold max-w-[500px]"
          style={{ lineHeight: "35px" }}
        >
          {loading ? data.overview : <Skeleton count={3} />}
        </p>
      )}
      <div className="flex justify-start gap-3 items-center mt-5">
        {loading ? (
          <>
            <DetailsButton
              title="View Movie"
              styles="sm:px-6 px-4"
              isMovieOrTv={isMovieOrTv}
              id={data.id}
              media_type={data.media_type}
            />
            <WatchlistButton
              id={data.id}
              name={data.title || data.name || data.original_title}
              mediaType={data.media_type ? data.media_type : isMovieOrTv}
              styles="sm:px-6 px-4"
            />
          </>
        ) : (
          <Skeleton
            containerClassName="flex gap-2"
            count={2}
            width={125}
            height={45}
          />
        )}
      </div>
    </div>
  );
}

export default ContentWrapper;
