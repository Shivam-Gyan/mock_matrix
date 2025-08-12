import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../../assets/logo.png';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import { googleAuthApi } from '../../services/database.services';
import { useAuth } from '../../context/context';

const Navbar = () => {
  const { user: auth, setUser,setProjects } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(true);

  // google response handle
  const responseGoogle = async (googlecode) => {
    try {
      if (googlecode['code']) {
        // Handle successful login
        const response = await googleAuthApi(googlecode['code']);
        if (response.user) {
          localStorage.setItem("token", response.token);
          setUser(response.user);
          setProjects(response.projects);
          toast.success("Google Auth Successful");
        }
      } else {
        toast.error("Google Auth Failed");
      }
    } catch (err) {
      toast.error(err.message);
      console.error("Google Auth Error:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
  }

  // google auth
  const googleAuth = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

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
            <HashLink smooth to="/#about" className="nav-link-text font-inconsolata text-slate-700 hover:text-blue-600 transition">
              About
            </HashLink>
            <HashLink smooth to="/#generate" className="nav-link-text font-inconsolata text-gray-700 hover:text-blue-600 transition">
              Generate
            </HashLink>
            <Link to="/docs" className="nav-link-text font-inconsolata text-gray-700 hover:text-blue-600 transition">Documentation</Link>
            <HashLink smooth to="/#services" className="nav-link-text font-inconsolata text-gray-700 hover:text-blue-600 transition">Services</HashLink>
            <HashLink smooth to="/#contact" className="nav-link-text font-inconsolata text-gray-700 hover:text-blue-600 transition">Contact</HashLink>
          </nav>

          {/* Avatar */}
          {auth ?
            <div className="max-md:hidden flex items-center gap-1 relative">
              <Link to={'/dashboard'} className="text-amber-900 hover:underline cursor-pointer font-inconsolata font-semibold flex-none  text-sm">{auth?.username}</Link>
              <div className="rounded-full p-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                <Link to={'/dashboard'} className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  <img src={auth?.picture || "https://tse2.mm.bing.net/th/id/OIP.MNYMRopweKA9axhd73z_GwHaE8?pid=Api&P=0&h=180"} alt="" className='w-full h-full object-cover' />
                </Link>
              </div>
            </div> :
            <div className="flex max-md:hidden gap-5 items-center">
              <button onClick={googleAuth} className=" h-fit font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Login</button>
              <button onClick={googleAuth} className=" h-fit  font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Sign Up</button>
            </div>
          }
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden absolute flex items-center gap-5 right-4 top-1/2 -translate-y-1/2">
          {auth ?
            <div className="max-md:hidden flex items-center gap-1 relative">
              <span className="text-gray-700 nunito-400 text-sm">{auth?.username}</span>
              <div className="rounded-full p-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                <Link to={'/dashboard'} className="w-10 h-10 overflow-hidden rounded-full bg-gray-200">
                  <img src={auth?.picture || "https://tse2.mm.bing.net/th/id/OIP.MNYMRopweKA9axhd73z_GwHaE8?pid=Api&P=0&h=180"} alt="" className='w-full h-full object-cover' />
                </Link>
              </div>
            </div> :
            <div className="flex max-sm:hidden gap-5 items-center">
              <button onClick={googleAuth} className=" h-fit font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Login</button>
              <button onClick={googleAuth} className=" h-fit  font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Sign Up</button>
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
                  <HashLink smooth to="/#about" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">About</HashLink>
                  <HashLink smooth to="/#generate" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">Generate</HashLink>
                  <Link to="/docs" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">Docs</Link>
                  <HashLink smooth to="/#services" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">Services</HashLink>
                  <HashLink smooth to="/#contact" onClick={() => setIsMobileOpen(false)} className="nav-link-text-md font-inconsolata text-gray-700 hover:text-blue-600 transition">Contact</HashLink>
                </nav>
              </div>
              <div className='flex flex-col justify-center'>
                <h1 className='text-lg nunito-600 my-4 border-b-[1px] border-gray-200'>Auth</h1>
                {
                  auth ? (
                    <div className='flex flex-col gap-4'>
                      <div className=" flex items-center gap-1">
                        <div className="rounded-full p-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                          <div className="w-10 h-10  overflow-hidden rounded-full bg-gray-200">
                            <img src={auth?.picture || "https://tse2.mm.bing.net/th/id/OIP.MNYMRopweKA9axhd73z_GwHaE8?pid=Api&P=0&h=180"} alt="" className='w-full h-full object-cover' />
                          </div>
                        </div>
                        <span className="text-gray-700">@{auth?.username}</span>
                      </div>
                      <Link to={'/dashboard'} className="h-fit text-center font-inconsolata px-3 py-1 rounded-lg bg-slate-700 text-white hover:text-white transition">Dashboard</Link>
                      <button onClick={handleLogout} className="h-fit font-inconsolata px-3 py-1 rounded-lg bg-slate-700 text-white hover:text-white transition">Logout</button>
                    </div>
                  ) : (
                    <div className='ml-6 flex flex-col gap-2 text-center'>
                      <button onClick={googleAuth} className=" h-fit font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Login</button>
                      <button onClick={googleAuth} className=" h-fit  font-inconsolata px-3 py-1 rounded-lg bg-slate-700  text-white hover:text-white transition">Sign Up</button>
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
