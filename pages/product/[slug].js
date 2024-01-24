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
  }

  return (
    <div className='mt-20'>
      {/* ***************************************************************************** */}
      <div className='grid md:grid-cols-2'>

        {/* 2 Standard */}
        <div className='text-slate-800 rounded-xl relative mx-auto md:pr-0' >
          <div>
            <div className="">
              <img src={urlFor(image && image[index])} className="md:h-[400px] md:w-[400px] mx-auto sm:h-[100px] sm:w-[200px]" />
            </div>
            <div className="small-images-container p-1 inline-flex">
              {image?.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item)}
                  className={i === index ? 'small-image selected-image gap-2' : 'small-image gap-2'}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 5 Standard */}
        <div className='text-slate-900 rounded-xl relative mx-auto md:pr-32'>
          <div className="product-detail-desc border p-10">
            <h1 className='text-2xl font-bold text-slate-700'>{name}</h1>
            <div className="reviews">
              <div className='inline-flex'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>
                (20)
              </p>
            </div>
            <h4 className='font-bold text-slate-700'>Details: </h4>
            <p>{details}</p>
            <p className="price">$ {price}</p>
            <div className="quantity font-bold text-slate-700">
              <h3>Quantity:</h3>
              <p className="quantity-desc inline-flex text-center"  >
                <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
              </p>
            </div>
            <div className="buttons">
              <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
              <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
        
      </div>
      {/* ***************************************************************************** */}
      <div className="maylike-products-wrapper">
        <h2 className='text-5xl font-bold text-white py-8 mx-auto'>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails;