import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='w-full mt-24 bg-slate-900 text-white py-8 px-2'>
      <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-white py-8'>
        {/* 1 */}
        <div>
          <h6 className='font-bold uppercase pt-2'>Explore</h6>
          <ul>
            <li className='py-1'>Home</li>
            <li className='py-1'>Shop</li>
            <li className='py-1'>Products</li>
            <li className='py-1'>Contact</li>
            <li className='py-1'>About Us</li>
          </ul>
        </div>
        {/* 2 */}
        <div>
          <h6 className='font-bold uppercase pt-2'>Contact Us</h6>
          <ul>
            <li className='py-5'>Email: info@fishingtackle.com</li>
            <li className='py-1'>Visit our store or contact us online for any inquiries.</li>
            <li className='py-1'>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>
        {/* 3 */}
        <div>
          <h6 className='font-bold uppercase pt-2'>Passionate About Fishing</h6>
          <ul>
            <li className='py-1'>At Fishing Tackle Store, we love everything about fishing and aim to provide top-quality gear and advice.</li>
            <li className='py-1'>Subscribe to our newsletter for the latest product updates, fishing tips, and exclusive offers.</li>
          </ul>
        </div>

        <div className='col-span-2 pt-8 md:pt-2'>
          <p className='font-bold uppercase'>Subscribe to our Newsletter</p>
          <p className='py-4'>Receive the latest updates, tips, and exclusive offers directly in your inbox.</p>
          <form className='flex flex-col sm:flex-row'>
            <input className='w-full p-2 mr-4 rounded-md mb-4' type="email" placeholder='Enter Email' />
            <button className='p-2 mb-4 bg-white text-blue-900 rounded-md'>Subscribe</button>
          </form>
        </div>
      </div>

      <div className='flex flex-col max-w-[1024px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-500'>
        <p className='py-4'>&copy; 2024 Fishing Tackle Store. All rights reserved.</p>
        <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
          <FaPinterest />
        </div>
      </div>
    </div>
  )
}

export default Footer;
