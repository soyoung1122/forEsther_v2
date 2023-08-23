import { 
  BrowserRouter as Router,
  Switch,
  Route      
} from "react-router-dom";

import routes from './routers/routes';

function App() {
  return (
    <Router>
      <h1>home</h1>
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
    </Router>
  );
}

export default App;
