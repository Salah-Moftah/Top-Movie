import Link from "next/link"
import { IoIosArrowForward } from "react-icons/io"

function Headline({ title, link = '#' } : { title: string, link?: string }) {
  return (
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-white text-xl 
      font-bold">{title}</h2>
      <Link href={link} className="text-blue-500 flex gap-1 items-center text-[15px]">See More <IoIosArrowForward /></Link>
    </div>
  )
}

export default Headline

