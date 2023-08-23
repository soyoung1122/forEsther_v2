import { 
  BrowserRouter as Router,
  Switch,
  Route      
} from "react-router-dom";

import routes from './routers/routes';
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map((route) => {
            return (
              <Route 
                exact
                key={route.path}
                path={route.path}
                component={route.component}
              />
            )
          })}
        </Switch>
      </Layout>
  </Router>
  );
}

export default App;
