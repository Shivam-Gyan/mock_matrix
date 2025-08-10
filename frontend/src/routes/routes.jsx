import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../pages/home';
import Documentation from '../pages/docs';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="docs" element={<Documentation />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;