import EmptyState from "@/components/EmptyState"
import getCurrentUser from "@/actions/getCurrentUser"
import PropertiesClient from "./PropertiesClient"
import getListings from "@/actions/getListings"


const PropertiesPage = async () => {

  const currentUser = await getCurrentUser()
  if(!currentUser) return <EmptyState title="Unauthorized" subtitle="Please login" />

  const listings = await getListings({
    userId: currentUser.id
  })
  if(listings.length === 0) return <EmptyState title="No Listings found" subtitle="Looks like you don't own any properties" />

  return (
    <div>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </div>
  )
}

export default PropertiesPage