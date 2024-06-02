import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">Rebel Fishing Lures</Link>
        </div>

        <div className="lg:hidden text-white text-2xl" onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>

        <ul className={`flex-col lg:flex-row lg:flex lg:items-center absolute lg:static bg-gray-800 lg:bg-transparent w-full lg:w-auto transition-all duration-300 ease-in ${menuOpen ? 'top-16' : 'top-[-490px]'} lg:top-0`}>
          <li className="text-white lg:mx-4 my-2 lg:my-0 text-center">
            <Link href="/">Home</Link>
          </li>
          <li className="text-white lg:mx-4 my-2 lg:my-0 text-center">
            {/*<Link href="/contact">Contact</Link>*/}
          </li>
          <li className="flex justify-center lg:mx-4 my-2 lg:my-0">
            <button type="button" className="relative text-white" onClick={() => { setShowCart(true); setMenuOpen(false); }}>
              <AiOutlineShopping className="text-2xl" />
              <span className="absolute top-[-10px] right-[-10px] bg-red-600 rounded-full px-2 py-1 text-xs">
                {totalQuantities}
              </span>
            </button>
          </li>
        </ul>
      </div>

      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
