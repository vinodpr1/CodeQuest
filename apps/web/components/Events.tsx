import React from "react";
import EventCard from "./EventCard";

const Events = () => {
  return (
    <section className="py-8 md:py-12 px-6 md:px-4">
      <div className="w-full flex gap-8 flex-col md:flex-row">
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Previous Contests</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the previous programming contests on Codeforces.
            </p>
          </div>
          <div className="justify-between gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => {
              return (
                <EventCard
                  key={index}
                  title="Starter Div1"
                  id={1}
                  startTime={5}
                  endTime={7}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full flex gap-8 flex-col md:flex-row pt-8">
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Upcoming Contests</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the upcoming programming contests on Codeforces.
            </p>
          </div>
          <div className="justify-between gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <EventCard
                  key={index}
                  title="Startee end"
                  id={1}
                  startTime={5}
                  endTime={7}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
