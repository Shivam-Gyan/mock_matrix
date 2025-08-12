import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../pages/home';
import Documentation from '../pages/docs';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '../context/context';
import Dashboard from '../pages/dashboard';
import PageNotFound from '../common/PageNotFound.common';
import Loader from '../common/Loader.common';


// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user: auth} = useAuth();
  // const auth = false; // Simulating authentication
  if (!auth) {
    return <main className="flex items-center justify-center h-[calc(100vh-5rem)]"><Loader/></main>; // Or a spinner
  }
  return auth ? children : <Navigate to="/" replace />;
};
const Routes = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Switch>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="docs" element={<Documentation />} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Switch>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default Routes;