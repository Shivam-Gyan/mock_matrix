import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../pages/home';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="about" element={<div className="text-5xl">About</div>} />
          <Route path="contact" element={<div className="text-5xl">Contact</div>} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;