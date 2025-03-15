"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Landing from "../components/Landing";

const page = () => {
  const session = useSession();
  return (
    <main className="mx-auto px-8">
      <div className="container mx-auto">
        <Landing />
      </div>
    </main>
  );
};

export default page;
