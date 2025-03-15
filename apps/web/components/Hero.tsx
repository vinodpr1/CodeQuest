import Link from "next/link";
import React from "react";
import "../app/globals.css";
import { Button } from "../src/components/ui/button";

const Hero = () => {
  return (
    <section className="py-8 md:py-12 px-6 md:px-4">
      <div className="w-full flex gap-8 flex-col md:flex-row">
        <div className="flex-1 mx-auto hero-bg flex-grow flex items-center justify-center relative">
          <div className="absolute inset-0 dot-pattern"></div>
          <div className="glow top-1/4 left-1/4"></div>
          <div className="glow bottom-1/4 right-1/3"></div>
          <div className="glow top-1/3 right-1/4"></div>

          <div className="container mx-auto px-6 relative text-center py-20">
            <h1 className="text-xl md:text-3xl font-semibold text-black mb-6 leading-tight">
              Level up with{" "}
              <span className="bg-gradient-to-tr from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                CodeX
              </span>
            </h1>
            <p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto mb-10">
              The editor you love, now live! Power up your competitive coding
              with speed and scalability. reliable and scalable applications
              faster.
            </p>
            <Link href={"/problems/hiiiiiii"}>
              <Button className="leetcode-button text-sm md:text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 mx-auto flex-grow flex items-center justify-center relative">
          <img
            src="https://ideogram.ai/assets/image/balanced/response/OZ93FYuyRpmpgNxX0fRMSw"
            width="600"
            height="400"
            alt="CodeX"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
