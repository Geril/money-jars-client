import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import Home from '../Home/home';
import RegistrationPage from '../RegistrationPage/registration-page';
import Dashboard from '../Dashboard/dashboard';
import Privacy from '../Privacy/privacy';
import {refreshAuthToken} from '../../actions/auth';
import { connect } from 'react-redux';

export class App extends React.Component {
  componentDidUpdate(prevProps){
    if(!prevProps.logginIn && this.props.logginIn){
      this.startPeriodicRefresh();
    }else if (prevProps.logginIn && !this.props.logginIn){
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount(){
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh(){
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60*60*1000
    );
  }

  stopPeriodicRefresh(){
    if(!this.refreshInterval){
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />       
          <main role="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={RegistrationPage} />
              <Route path="/dashboard" component={Dashboard} />
              <Route exact path="/privacy" component={Privacy} />
            </Switch>
          </main>          
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !==null,
  loggedIn: state.auth.currentUser !==null
});

export default withRouter(connect(mapStateToProps)(App));


