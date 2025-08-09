import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const auth = true;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="">
      <header className="bg-gray-50 relative">

        {/* Centered Container */}
        <div className=" flex justify-start md:justify-evenly px-6 md:px-10 h-16 ">
          {/* Logo */}
          <div className="flex items-center  gap-2 mr-6 md:mr-10">
            <Link to="/" className="w-7 h-7 shrink-0">
              <img src={logo} alt="logo" className="object-cover w-full h-full" />
            </Link>
            <h1 className="text-md quicksand-700 pointer-events-none text-gray-800">MOCK MATRIX</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center md:mr-5">
            <Link to="/about" className="nav-link-text font-inconsolata text-gray-700 hover:text-blue-600 transition">About</Link>
            <Link to="/docs" className="nav-link-text font-inconsolata text-gray-700 hover:text-blue-600 transition">Documentation</Link>
            <Link to="/services" className="nav-link-text font-inconsolata text-gray-700 hover:text-blue-600 transition">Services</Link>
            <Link to="/contact" className="nav-link-text font-inconsolata text-gray-700 hover:text-blue-600 transition">Contact</Link>
          </nav>

          {/* Avatar */}
          {auth ?
            <div className="max-md:hidden flex items-center gap-1">
              <span className="text-gray-700 nunito-400 text-sm">john doe</span>
              <div className="rounded-full p-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              </div>
            </div> :
            <div className="flex max-md:hidden gap-5 items-center">
              <Link to="/login" className=" h-fit font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Login</Link>
              <Link to="/signup" className=" h-fit  font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Sign Up</Link>
            </div>
          }
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden absolute flex items-center gap-5 right-4 top-1/2 -translate-y-1/2">
          {auth ?
            <div className="max-sm:hidden flex items-center gap-1">
              <span className="text-gray-700">john doe</span>
              <div className="rounded-full p-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              </div>
            </div> :
            <div className="flex max-sm:hidden gap-5 items-center">
              <Link to="/login" className=" h-fit font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Login</Link>
              <Link to="/signup" className=" h-fit  font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Sign Up</Link>
            </div>
          }
          <button onBlur={() => setTimeout(() => setIsMobileOpen(false), 300)} onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
            <i className="fi fi-sr-apps text-xl text-gray-700"></i>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileOpen && (
          <>
            <div
              className="absolute md:hidden top-[50px] right-4
                 w-0 h-0
                 border-l-10 border-l-transparent
                 border-r-10 border-r-transparent
                 border-b-12 border-b-slate-800"
            ></div>
            <div className="absolute top-16 right-1 w-64 bg-white shadow-md rounded-lg z-50 py-2 p-4 md:hidden">
              <div className=''>
                <h1 className='text-lg nunito-600 my-4 border-b-[1px] border-gray-200'>Menu</h1>
                <nav className="flex ml-6 flex-col space-y-4 text-gray-700">
                  <Link to="/about" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">About</Link>
                  <Link to="/docs" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">Docs</Link>
                  <Link to="/services" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">Services</Link>
                  <Link to="/contact" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">Contact</Link>
                </nav>
              </div>
              <div className='flex flex-col justify-center'>
                <h1 className='text-lg nunito-600 my-4 border-b-[1px] border-gray-200'>Auth</h1>
                {
                  auth ? (
                    <div className=" flex items-center gap-1">
                      <div className="rounded-full p-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      </div>
                      <span className="text-gray-700">@john doe</span>
                    </div>
                  ) : (
                    <div className='ml-6 flex flex-col gap-2 text-center'>
                      <Link to="/login" className=" h-fit w-full font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Login</Link>
                      <Link to="/signup" className=" h-fit w-full font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Sign Up</Link>
                    </div>
                  )
                }
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Navbar;
