import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="relative bg-gray-800 text-white py-16 px-4 sm:px-8 md:px-16 lg:flex lg:items-center lg:justify-between mt-10">
      <div className="lg:w-1/2">
        <p className="text-sm font-light uppercase tracking-wide">
          {heroBanner.smallText}
        </p>
        <h3 className="text-2xl md:text-4xl font-semibold my-2">
          {heroBanner.midText}
        </h3>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          {heroBanner.largeText1}
        </h1>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          {heroBanner.largeText2}
        </h1>
        <Link href={`/product/${heroBanner.product}`}>
          <button
            type="button"
            className="mt-8 px-8 py-3 bg-red-600 text-white text-lg font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            {heroBanner.buttonText}
          </button>
        </Link>
        <div className="mt-6">
          <h5 className="text-lg font-semibold">Description</h5>
          <p className="text-sm mt-2">{heroBanner.desc}</p>
        </div>
      </div>
      <div className="lg:w-1/2 lg:ml-8 mt-8 lg:mt-0">
        <img
          src={urlFor(heroBanner.image)}
          alt="rapala"
          className="w-full h-auto rounded-md shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
