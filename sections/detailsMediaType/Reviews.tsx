"use client";

import { customTheme } from "@/custom-theme/Custom-Theme";
import { IReview, TMediaType } from "@/types/types";
import { getMovieReviews } from "@/utils/api";
import { Accordion, Flowbite } from "flowbite-react";
import { useEffect, useState } from "react";

type ReviewsProps = {
  id: string;
  movieOrTv: TMediaType;
  loading: boolean;
};

const Reviews = ({ id, movieOrTv, loading }: ReviewsProps) => {
  const [data, setData] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const getMovieReview = await getMovieReviews(movieOrTv, id);
      const reviews = getMovieReview.results;
      setData(reviews);
    };
    fetchData();
  }, []);
  return (
    <div className="sm:px-padding px-5 mx-auto mb-20">
      {loading && data.length > 0 && 
      <>
        <div className="mb-5">
          <h2
            className="text-white text-xl 
          font-bold"
          >
            Reviews
          </h2>
        </div>
        <Flowbite theme={{ theme: customTheme }}>
          <Accordion>
            {data.map((review: IReview) => (
              <Accordion.Panel key={review.id}>
                <Accordion.Title className="text-lg h-[60px] text-white bg-transparent focus:bg-[#0a2955]">
                  <div className="flex flex-col">
                    {review.author} <span className="text-xs text-gray-400">Rating: {review.author_details.rating === null ? 'No rating' : review.author_details.rating}</span>
                  </div>
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-gray-500">{review.content}</p>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </Flowbite>
      </>
      }
    </div>
  );
};

export default Reviews;
