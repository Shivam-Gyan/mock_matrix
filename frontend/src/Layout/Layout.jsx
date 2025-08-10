import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";


const Layout = () => {
  return (
    <div>
      {/* <header className="font-nunito py-2 bg-yellow-50 text-sm font-semibold text-center w-full ">welcome to MOCK MATRIX</header> */}
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <Outlet />
      
      {/* Footer */}
     <Footer />
    </div>
  );
};

export default Layout;