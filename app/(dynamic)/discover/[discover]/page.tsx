import Discover from "./Discover"

export async function generateMetadata({ params }: { params: { discover: string } }) {

  const discover = params.discover

  return {
    title: `${(discover[0].toUpperCase() + discover.substring(1)).replace('-', ' ')} - Top Movie`,
    description: `${(discover[0].toUpperCase() + discover.substring(1)).replace('-', ' ')} movies list`,
  };
}

function DiscoverPage({ params }: { params: { discover: string } }) {

  const discover = params.discover

  return (
    <div>
      <Discover discover={discover} />
    </div>
  )
}

export default DiscoverPage