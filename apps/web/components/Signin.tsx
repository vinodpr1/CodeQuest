"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {Button} from "../src/components/ui/button";
import { signIn } from "next-auth/react";

interface IAuth {
  component: string;
  loginHeading: string;
  authWithEmailText: string;
  userAuthOption: string;
  userAuthAction: string;
}

const Signin = ({
  component,
  loginHeading,
  authWithEmailText,
  userAuthOption,
  userAuthAction,
}: IAuth) => {

  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    signIn("credentials", { email:formData.get("email"), password: formData.get("password")});
  };

  return (
    <div className="">
      <div className="pt-12 flex flex-col lg:grid lg:grid-cols-10">
        <div className="min-h-screen flex flex-col py-12 px-2 col-span-4 justify-between border-r">

          <div className="p-2 ">
            <Link href={"/"}>
              <Button variant={"outline"} className="cursor-pointer border border-gray-400 hover:bg-gray-200 flex justify-center items-center py-1 px-2 gap-1 text-sm font-medium rounded transition-all duration-500">
                <ArrowLeft className="h-5 w-5 font-light text-base" /> Home
              </Button>
            </Link>
          </div>

          <div className="">
            <p className="text-2xl font-medium sm:text-3xl sm:font-semibold">
              <span className="text-3xl font-semibold sm:font-bold sm:text-4xl bg-gradient-to-tr from-[#2affec] to-green-700 bg-clip-text text-transparent">
                DevChallenge{" "}
              </span>
              Sharpen your <br /> coding skills with real challenges.
            </p>
          </div>
          <div className="flex items-center pt-8 max-w-full">
            <div className="">
              <div className="lightning-line"></div>
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>

        <div className="col-span-6 flex flex-col justify-center">
          <div className="flex flex-col items-center ">
            <div className="wi-[100%]">
              <div className="flex flex-col ">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-semibold">
                    <span>{loginHeading}</span>
                  </h2>
                  <h4 className="text-md text-gray-400 font-medium">
                    <span>Connect to leetcode with:</span>
                  </h4>
                </div>
              </div>
              <div className="grid grid-cols-2 pt-2 gap-2">
                <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-2 rounded-md transition-colors">
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Google</span>
                </button>

                <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-2 rounded-md transition-colors">
                  <img
                    src="https://github.com/favicon.ico"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span className="font-medium">GitHub</span>
                </button>

                <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-2 rounded-md transition-colors">
                  <img
                    src="https://www.apple.com/favicon.ico"
                    alt="Apple Logo"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Apple</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-2 rounded-md transition-colors">
                  <img
                    src="https://img.icons8.com/color/48/discord-logo.png"
                    alt="Discord Logo"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Discord</span>
                </button>
              </div>

              <div className="flex flex-col w-full items-center justify-center mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-[1px] w-16 bg-gray-400"></div>
                  <span className="text-xs text-gray-400 uppercase">
                    {authWithEmailText}
                  </span>
                  <div className="h-[1px] w-16 bg-gray-400"></div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 w-full pb-6"
                >
                  {component === "signup" && (
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="name">
                        <span className="text-sm text-gray-400">Name</span>
                      </label>
                      <div>
                        <input
                          name="name"
                          className="w-[100%]  border border-gray-600 rounded px-4 py-2"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="email">
                      <span className="text-sm text-gray-400">Email</span>
                    </label>
                    <div>
                      <input
                        name="email"
                        className="w-[100%] border border-gray-600 rounded px-4 py-2"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="password">
                      <span className="text-sm text-gray-400">Password</span>
                    </label>
                    <div>
                      <input
                        name="password"
                        className="w-[100%] border border-gray-600 rounded px-4 py-2"
                        type="password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className=" text-gray-500 py-2 rounded border border-gray-600 w-full flex flex-col gap-2"
                  >
                    Submit
                  </button>
                </form>

                <h3 className="flex gap-2 justify-center items-center">
                  <span className="text-gray-400">{userAuthOption}</span>{" "}
                  <Link href={component == "signup" ? "/signin" : "signup"}>
                    <span className="text-blue-600">{userAuthAction}</span>
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
