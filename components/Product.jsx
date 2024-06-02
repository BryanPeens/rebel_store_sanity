import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div className="p-4">
      <Link href={`/product/${slug.current}`}>
        <a className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
          <img src={urlFor(image && image[0])} alt={name} className="w-full h-56 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-700">${price}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Product;
