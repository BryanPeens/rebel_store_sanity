import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
    <div className="bg-gray-800 text-white py-16 px-4 sm:px-8 md:px-16 relative mt-5 rounded-lg">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="lg:w-1/3 text-center lg:text-left mb-8 lg:mb-0">
          <p className="text-lg font-semibold">{discount}</p>
          <h3 className="text-4xl md:text-6xl font-bold my-2">{largeText1}</h3>
          <h3 className="text-4xl md:text-6xl font-bold my-2">{largeText2}</h3>
          
        </div>
        <div className="lg:w-1/3 text-center lg:text-left mb-8 lg:mb-0">
          <p className="text-sm font-light uppercase tracking-wide">{smallText}</p>
          <h3 className="text-3xl md:text-5xl font-semibold my-2">{midText}</h3>
          <p className="text-sm mt-2">{desc}</p>
          <div className="mt-6">
            <Link href={`/product/${product}`}>
              <button type="button" className="px-8 py-3 bg-red-600 text-white text-lg font-medium rounded-md hover:bg-red-700 transition-colors w-full lg:w-5/6">
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/3">
          <img 
            src={urlFor(image)} 
            alt="Footer Banner Image" 
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default FooterBanner;
