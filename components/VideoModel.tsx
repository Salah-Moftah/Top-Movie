"use client";

import { VideoModelProps } from "@/types/types";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function VideoModel({ show, setShow, videoId, setVideoId }: VideoModelProps) {
  
  const hideModel = () => {
    setShow(false);
    setVideoId(null);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`videoModel flex justify-center items-center
      w-full h-full fixed top-0 left-0 
      z-[1000] ${show ? "visible opacity-100 show" : "invisible opacity-0"}`}
    >
      <div
        className={`opacityLayer ${show ? "opacity-100" : "opacity-0"} 
        absolute w-full h-full top-0 left-0
        backdrop-blur-sm  transition-opacity duration-[400ms]`}
        onClick={hideModel}
      />
      <div
        className={`videoPlayer ${show ? "scale-100" : "scale-[0.2]"}
        relative w-[800px] aspect-video
      bg-white transition-transform duration-[300ms]`}
      >
        <span
          className="absolute -top-5 right-0 text-white cursor-pointer"
          onClick={hideModel}
        >
          Close
        </span>
        {isLoaded ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
          />
        ) : null}
      </div>
    </div>
  );
}

export default VideoModel;
