import { getSelectedMovie } from "@/utils/api";
import MediaType from "./MediaType";
import { TMediaType } from "@/types/types";

export async function generateMetadata({ params }: { params: { idAndMediaType: TMediaType[] } }) {
  
  const [mediaType, id] = params.idAndMediaType;

  const mediaTypeData = await getSelectedMovie(mediaType, id)

  return {
    title: `${mediaTypeData?.title || mediaTypeData?.name || mediaTypeData?.original_title} - Top Movie`,
    description: mediaTypeData?.overview,
  };
}

function MediaTypePage({ params }: { params: { idAndMediaType: TMediaType[] } }) {
  
  const [mediaType, id] = params.idAndMediaType;

  return (
    <div>
      <MediaType mediaType={mediaType} id={id} />
    </div>
  );
}

export default MediaTypePage;
