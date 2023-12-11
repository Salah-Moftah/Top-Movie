import { Headline } from "@/components";
import { ICast } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

function TopCast({ cast, loading }: { cast: ICast[], loading: boolean }) {
  return (
    <div className="sm:px-padding px-5 mx-auto relative mb-20">
      {loading && cast.length > 0 &&
        <Headline title="Top Cast" />
      }
      <div className="flex gap-5 text-center overflow-hidden">
        {loading && 
        cast.map((member: ICast) => (
          <Link href={`/person/${member.id}`} key={member.id} className="flex flex-col items-center">
            <div className="relative rounded-full overflow-hidden md:w-40 md:h-40 w-28 h-28">
              <Image
                src={member.profile_path !== null ? `https://image.tmdb.org/t/p/original/${member.profile_path}` : '/kisspng-avatar.jpg'}
                alt={member.name}
                fill
                sizes="100vh"
                className="object-cover blur-lg transition-all duration-300"
                onLoadingComplete={(image) => image.classList.remove('blur-lg')}
              />
            </div>
            <h4 className="mt-3 font-bold text-white text-sm md:text-base">{member.name}</h4>
            <p className="text-gray-500 leading-7 text-sm md:text-base line-clamp-2">{member.character}</p>
          </Link>
        )).slice(0, 10)
      }
      </div>
    </div>
  );
}

export default TopCast;
