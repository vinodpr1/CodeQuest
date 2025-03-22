import Event from "components/Event";
import React from "react";

const page = ({ params }: { params: { eventId: string } }) => {
  const eventId = params.eventId;
  return (
    <main className="pt-16">
      <Event id={eventId} />
    </main>
  );
};

export default page;
export const dynamic = "force-dynamic";
