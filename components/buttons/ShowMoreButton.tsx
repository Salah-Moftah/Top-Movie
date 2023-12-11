import { ShowMoreButtonProps } from "@/types/types";

function ShowMoreButton({
  title,
  styles,
  show,
  setShow = () => {},
}: ShowMoreButtonProps) {
  
  return (
    <div
      onClick={() => {
        setShow(show + 20);
      }}
      className={`${styles} cursor-pointer px-6 relative inline-flex items-center justify-center py-3 overflow-hidden font-bold text-indigo-600 transition duration-300 ease-out rounded-lg shadow-xl group`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white">{title}</span>
    </div>
  );
}

export default ShowMoreButton;
