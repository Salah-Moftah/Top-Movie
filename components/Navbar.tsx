"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { navList } from "@/constants";
import { SearchInput } from ".";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav
        style={{ background: "rgb(0 0 0 / 40%)" }}
        className="absolute top-0 left-0 z-50 w-full sm:px-padding px-5"
      >
        <div className="mx-auto">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center justify-between w-full">
              <Link href='/' className="flex">
                <Image
                  src="/logo.png"
                  width={34}
                  height={34}
                  className="sm:mr-3 mr-1 sm:w-[34px] sm:h-[34px] w-[24px] h-[24px]"
                  alt="Flowbite React Logo"
                />
                <span
                  className="self-center
                whitespace-nowrap sm:text-2xl
                text-md font-bold text-white"
                >
                  Top Movie
                </span>
              </Link>
              <div className="flex gap-4 items-center">
                <div className="hidden lg:block">
                  <div className="flex gap-4">
                    {navList.map((link) => (
                      <Link
                        key={link.title}
                        href={link.links}
                        className={` hover:text-blue-500 text-white text-base font-medium transition-all duration-200`}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="sm:mr-2 mr-0 lg:mr-0">
                  <SearchInput />
                </div>
              </div>
            </div>
            <div className="-mr-2 flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-white hover:bg-bg-primary"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {isOpen ? (
            <div className="lg:hidden bg-white absolute
            right-0 top-0 w-[150px] rounded-b-lg" id="mobile-menu">
              <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3
              ">
              {navList.map((link) => (
                      <Link
                        key={link.title}
                        href={link.links}
                        className={`hover:text-blue-500 lg:text-white text-gray-700 px-3 py-2 text-base font-medium`}
                      >
                        {link.title}
                      </Link>
                    ))}
              </div>
            </div>
          ) : null}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
