import { DetailsButtonProps } from "@/types/types";
import Link from "next/link";

function ShowMoreButton({
  title,
  styles,
  isMovieOrTv,
  media_type,
  id,
  setShow = () => {},
  setVideoId = () => {},
  videoKey,
}: DetailsButtonProps) {
  
  return (
    <Link
      href={!videoKey ? `/${media_type ? media_type : isMovieOrTv}/${id}` : '#'}
      onClick={() => {
        setVideoId(videoKey ? videoKey : null);
        setShow(true);
      }}
      className={`${styles} relative inline-flex items-center justify-center py-3 overflow-hidden font-bold text-indigo-600 transition duration-300 ease-out rounded-lg shadow-xl group`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white text-sm">{title}</span>
    </Link>
  );
}

export default ShowMoreButton;
