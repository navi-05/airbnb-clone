import EmptyState from "@/components/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {

  const currentUser = await getCurrentUser()
  if(!currentUser) return <EmptyState title="Unauthorized" subtitle="Please login!" />

  const reservations = await getReservations({
    authorId: currentUser.id
  })
  if(reservations.length === 0) return <EmptyState title="No reservations found" subtitle="Looks like you have no reservation on your listings" />

  return (
    <ReservationClient
      reservations={reservations}
      currentUser={currentUser}
    />
  )
}

export default ReservationPage