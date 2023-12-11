"use client";

import { IActor } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io"
import Skeleton from "react-loading-skeleton";

type DetailsPersonProps = {
  data: IActor | null,
  loading: boolean
}

function DetailsPerson({ data, loading }: DetailsPersonProps) {
  
  const currentDate = new Date();

  const birthDate = data?.birthday ? new Date(data.birthday) : 0;

  let ageInMilliseconds;
  
  if (birthDate) {
    const timeDifference = currentDate.getTime() - birthDate.getTime();
    ageInMilliseconds = timeDifference;
  } else {
    ageInMilliseconds = 0;
  }
  const ageInSeconds = ageInMilliseconds / 1000;
  const ageInMinutes = ageInSeconds / 60;
  const ageInHours = ageInMinutes / 60;
  const ageInDays = ageInHours / 24;

  const ageInYears = Math.floor(ageInDays / 365);

  const [showFullBio, setShowFullBio] = useState(false);
  const truncatedBio = `${data?.biography.slice(0, 580)}...`;

  const info = (title: string, data: any) => {
    return (
      <li className="lg:flex-2 flex-[100%] items-center gap-2 border-b border-[#ffffff1a] leading-10 flex">
        <span className="font-medium text-lg">{title}: </span>
        <span className="text-gray-400 flex items-center gap-3 line-clamp-1">
          {data}
        </span>
      </li>
    );
  };

  return (
    <>
      {!loading ? (
        <div className="w-full md:h-[68vh] h-[1200px] mx-auto flex items-center justify-center  relative">
        <div
          className="lg:px-[130px] px-5 pt-28
        flex lg:items-center items-start justify-center
        left-0 top-0 gap-14 absolute w-full
        flex-col lg:flex-row mb-20 mx-auto"
        >
          <div className="sm:max-w-[300px] w-full h-[450px]">
            <Skeleton width='100%' height='100%' />
          </div>
          <div className="flex-1 items-start">
            <Skeleton height={35} width={300} className="mb-10" />
            <Skeleton height={28} width={150} className="mb-4" />
            <Skeleton
              className="mb-3"
              count={3}
              height={25}
              width="80%"
            />
            <Skeleton height={28} width={150} className="mb-4" />
            <Skeleton
              className="mb-2"
              count={4}
              width="100%"
            />
          </div>
        </div>
      </div>
      ) : (
        <>
          {data &&
            <div
              className="lg:px-[130px] px-5 mx-auto pt-28
              flex items-center lg:items-start gap-14 relative w-full
              flex-col lg:flex-row mb-20"
            >
              <div className="sm:max-w-[300px] w-full h-[450px]">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.profile_path}`}
                  alt={`${data.name}`}
                  width={500}
                  height={500}
                  className="h-full w-full rounded-2xl"
                />
              </div>
              <div className="flex-1 items-start gap-2 text-white">
                <h2 className="md:text-3xl text-2xl mb-7 font-semibold">{data.name}</h2>
                <h2 className="md:text-2xl text-xl mb-1 font-medium">Personal Info</h2>
                <ul className="flex flex-wrap w-full mb-5">
                  {data.known_for_department &&
                    info("Known For", data.known_for_department)}
                  {data.movie_credits &&
                    data.tv_credits &&
                    info(
                      "Known Credits",
                      data.movie_credits?.cast.length + data.tv_credits?.cast.length
                    )}
                  {data.gender && info("Gender", data.gender === 2 ? "Male" : "Female")}
                  {data.birthday &&
                    info("Birthday", `${data.birthday} (${ageInYears} years old)`)}
                  {data.birthday && info("Place of Birth", data.place_of_birth)}
                </ul>
                <h2 className="md:text-2xl text-xl mb-4 font-medium">Biography</h2>
                <div>
                  <div className="p-3 bg-blue-950 rounded-2xl">
                    {showFullBio ? (
                      <div className=''>
                        {data.biography}
                        {data.biography.length > 580 && (
                          <button 
                            className="text-blue-500 hover:text-pink-500 font-semibold
                            ml-1"
                            onClick={() => setShowFullBio(false)}>
                            Read Less
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="font-light relative truncatedBio">
                        {truncatedBio}
                        <div className="flex justify-end w-full absolute bottom-0 left-0 z-10 h-[22px]">
                          {data.biography.length > 580 && (
                            <button className="text-blue-500 hover:text-pink-500 font-semibold
                            flex gap-[2px] items-center" 
                              onClick={() => setShowFullBio(true)}>
                              Read More <IoIosArrowForward />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      )}
    </>
  );
}

export default DetailsPerson;
