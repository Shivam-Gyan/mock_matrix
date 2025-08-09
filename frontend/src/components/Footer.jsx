import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-10 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <Link to="/" className="w-10 h-10">
              <img src={logo} alt="Mock Matrix Logo" className="object-cover w-10 h-10" />
            </Link>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Mock Matrix</h2>
              <p className="text-sm text-gray-500 -mt-1">Don't copy, create one.</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-6 mb-4 sm:mb-0">
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/docs" className="hover:text-blue-600 transition">Docs</Link>
            <Link to="/services" className="hover:text-blue-600 transition">Services</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </div>

          {/* Social Icons (Optional) */}
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              <i className="fab fa-github" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Mock Matrix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
