import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import farmerRegister from './farmers/register';
import farmerLogin from './farmers/login';
import customerRegister from './customer/register';
import customerLogin from './customer/login';
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/farmers'>Farmers</Link>
              </li>
              <li>
                <Link to='/customers'>Customers</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/'>
              <div>Hii</div>
            </Route>
            <Route path='/farmers'>
              <farmerRegister />
            </Route>
            <Route path='/customers'>
              <customerRegister />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
