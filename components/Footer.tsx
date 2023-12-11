import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RxSlash } from "react-icons/rx";
import { navList } from "@/constants";

function Footer() {
  return (
    <div className=" bg-bg-footer text-white">
      <div className="sm:px-padding px-5 py-16 flex justify-between lg:flex-row flex-col gap-4">
        <p className="w-full lg:w-1/3 lg:text-4xl sm:text-2xl text-xl font-semibold sm:leading-[48px] leading-[30px]">
          Our platform is trusted by millions & features best updated movies all
          around the world.
        </p>
        <div className="flex flex-col-reverse lg:flex-col justify-between gap-5 lg:gap-0 sm:text-base text-[15px]">
          <div className="flex justify-between flex-wrap items-center gap-2">
          {navList.map((item, index) => (
              <React.Fragment key={index}>
                <Link href={item.links} className="hover:text-blue-500 transition-all duration-[0.3s]">{item.title}</Link>
                {index < navList.length - 2 && <RxSlash />}
              </React.Fragment>
            )).slice(0, 4)}
          </div>
          <div className="flex lg:justify-end justify-start gap-4">
            <Link
              href="#"
              className="flex justify-center items-center 
            bg-bg-primary w-8 h-8 rounded-full
            hover:shadow-boxShadow transition-all duration-[0.3s]"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="#"
              className="flex justify-center items-center 
            bg-bg-primary w-8 h-8 rounded-full
            hover:shadow-boxShadow transition-all duration-[0.3s]"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              className="flex justify-center items-center 
            bg-bg-primary w-8 h-8 rounded-full
            hover:shadow-boxShadow transition-all duration-[0.3s]"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="#"
              className="flex justify-center items-center 
            bg-bg-primary w-8 h-8 rounded-full
            hover:shadow-boxShadow transition-all duration-[0.3s]"
            >
              <FaXTwitter />
            </Link>
          </div>
        </div>
      </div>
      <div className="sm:px-padding px-5 pb-12 flex justify-between items-center text-xs sm:flex-row flex-col text-gray-500 sm:gap-0 gap-3">
        <div className="flex gap-4">
          <span>Privacy policy</span>
          <span>Term of service</span>
          <span>Language</span>
        </div>
        <span>Made by Salah Moftah © 2023</span>
      </div>
    </div>
  );
}

export default Footer;
