import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import farmerLogin from './farmers/login';
import customerLogin from './customer/login';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul className='nav justify-content-end'>
              <li className='nav-item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to='/farmers'>Farmers</Link>
              </li>
              <li className='nav-item'>
                <Link to='/customers'>Customers</Link>
              </li>
            </ul>
          </nav>
          <Route path='/'>
            <div>Hii</div>
          </Route>
          <Route exact path='/farmers' component={farmerLogin}>
            <farmerLogin />
          </Route>
          <Route exact path='/customers' component={customerLogin}>
            <customerLogin />
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
