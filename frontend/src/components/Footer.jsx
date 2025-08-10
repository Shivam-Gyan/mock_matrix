import { HashLink } from 'react-router-hash-link';
import logo from '../assets/white-logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-slate-800/90 backdrop-blur-md text-gray-300 pt-10 pb-6 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <Link to="/" className="w-10 h-10">
              <img src={logo} alt="Mock Matrix Logo" className="object-cover w-10 h-10 rounded-full shadow-lg" />
            </Link>
            <div>
              <h2 className="text-lg nunito-600 text-white">Mock Matrix</h2>
              <p className="text-sm text-gray-400 -mt-1 italic">Imagine. Create. Transcend.</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center font-nunito sm:justify-end gap-6 mb-4 sm:mb-0">
            <HashLink smooth to="/#about" className="hover:text-indigo-400 transition">About</HashLink>
            <Link to="/docs" className="hover:text-indigo-400 transition">Docs</Link>
            <HashLink smooth to="/#services" className="hover:text-indigo-400 transition">Services</HashLink>
            <HashLink smooth to="/#contact" className="hover:text-indigo-400 transition">Contact</HashLink>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">
              <i className="fi fi-brands-twitter text-lg" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              <i className="fi fi-brands-linkedin text-lg" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100 transition">
              <i className="fi fi-brands-github text-lg" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} Mock Matrix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
