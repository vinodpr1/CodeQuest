import React from "react";
import { Button } from "../src/components/ui/button";
import Link from "next/link";

interface IEvent {
  title: string;
  id: number;
  startTime: number;
  endTime: number;
}

const EventCard = ({ title, id, startTime, endTime }: IEvent) => {
  return (
    <div className="shadow-lg bg-gray-200 hover:translate-y-1 rounded p-4 transition-all duration-500">
      <div className="">
        <div className="flex justify-between pb-2">
          <h1 className="text-xl font-semibold">
            {id}. {title}
          </h1>
          <span className="text-green-500 text-sm">Active</span>
        </div>
        <div className=" pb-2">
          <div className="flex justify-between text-sm text-gray-500 font-normal">
            <h1>Starts in</h1>
            <span className="">Duration</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 font-normal">
            <h1>{startTime} Hours</h1>
            <h1>{endTime} Hours</h1>
          </div>
        </div>
        <Button className="cursor-pointer">
          <Link href={"/event/2344343"}>Participate</Link>
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
