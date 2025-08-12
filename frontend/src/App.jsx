import { useEffect, useState } from 'react';
import Routes from './routes/routes';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/context';
import axios from 'axios';
import Loader from './common/Loader.common';
import { getProfile } from './services/database.services';

const App = () => {
  const { user, setUser, setProjects } = useAuth();
  const [loading, setLoading] = useState(true); // Start with loading true

  const fetchUserProfile = async () => {
    try {
      // const token = localStorage.getItem("token");

      // if (!token) {
      //   setLoading(false);
      //   return;
      // }

      // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
      // const { data } = await axios.get(`${API_BASE_URL}/auth/profile`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      const data = await getProfile(); // Assuming getProfile is defined in your services

      setUser(data.user);
      setProjects(data.projects);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading && !user) {
    return (
      <main className="flex items-center justify-center h-screen">
        <Loader />
      </main>
    );
  }

  return (
    <>
      <Toaster />
      <Routes />
    </>
  );
};

export default App;
