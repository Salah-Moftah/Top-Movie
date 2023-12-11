"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { IMovieData, IVideo } from "@/types/types";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import { PlayIcon, VideoModel } from "@/components";

function OfficialVideos({
  data,
  loading,
}: {
  data: IMovieData | null;
  loading: boolean;
}) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  return (
    <div className="sm:px-padding px-5 mb-20">
      {loading && data && data?.videos.results.length > 0 && (
        <div className="mb-5">
          <h2
            className="text-white text-xl 
          font-bold"
          >
            Official Videos
          </h2>
        </div>
      )}
      <div>
        <Swiper
          className="opacity-layer"
          slidesPerView={2.5}
          spaceBetween={10}
          breakpoints={{
            640: {
              width: 640,
              slidesPerView: 3,
            },
            768: {
              width: 768,
              slidesPerView: 3.5,
            },
            1024: {
              width: 1024,
              slidesPerView: 3.5,
            },
          }}
        >
          {loading &&
            data?.videos.results.map((video: IVideo) => (
              <SwiperSlide
                key={video.id}
                className="cursor-pointer"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail relative max-h-[150px] w-full">
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    alt={video.name}
                    height={500}
                    width={500}
                    className="w-full h-full rounded-2xl shadow-lg relative"
                  />
                  <PlayIcon />
                </div>
                <div className="mt-5">
                  <h4 className="text-white text-sm md:text-base leading-5 md:leading-6">
                    {video.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <VideoModel
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}

export default OfficialVideos;
