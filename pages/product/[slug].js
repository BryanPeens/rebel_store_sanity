import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div className="mt-10 md:mt-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img src={urlFor(image && image[index])} className="md:h-96 md:w-96 mx-auto sm:h-48 sm:w-48" alt="Product" />
          <div className="flex justify-center mt-2 space-x-2">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={`h-12 w-12 border border-gray-500 rounded-md cursor-pointer ${i === index ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                onMouseEnter={() => setIndex(i)}
                alt={`Thumbnail ${i}`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
          <div className="flex items-center mb-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < 4 ? <AiFillStar /> : <AiOutlineStar />}</span>
            ))}
            <p className="text-gray-600 ml-2">(20)</p>
          </div>
          <p className="text-gray-700 mb-4">{details}</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">${price}</p>
          <div className="flex items-center mb-4">
            <h3 className="mr-2 font-bold text-gray-700">Quantity:</h3>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3 py-1 cursor-pointer" onClick={decQty}><AiOutlineMinus /></span>
              <span className="px-3 py-1 bg-gray-100">{qty}</span>
              <span className="px-3 py-1 cursor-pointer" onClick={incQty}><AiOutlinePlus /></span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(item => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  };
};

export default ProductDetails;
