import { getSelectedPerson } from "@/utils/api";
import Person from "./Person";

export async function generateMetadata({ params }: { params: { idPerson: string } }) {
  
  const id = params.idPerson;

  const mediaTypeData = await getSelectedPerson(id)

  return {
    title: `${mediaTypeData.name || mediaTypeData.original_name} - Top Movie`,
    description: mediaTypeData.biography,
  };
}

async function PersonPage({ params }: { params: { idPerson: string } }) {
  
  const id = params.idPerson;

  return (
    <div>
      <Person id={id} />
    </div>
  );
}

export default PersonPage;