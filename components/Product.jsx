import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div className=''>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card text-center">
          <img src={urlFor(image && image[0])} width={250} className="product-image h-[250px]"/>
          <p className="product-name font-bold">{name}</p>
          <p className="product-price">$ {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product;