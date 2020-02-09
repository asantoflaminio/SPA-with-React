import React, { Component, Suspense } from 'react';
import {Switch, BrowserRouter} from 'react-router-dom';
import {Route, Redirect} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home'
import List from './pages/List'
import Publish from './pages/Publish'
import AdminGenerator from './pages/AdminGenerator'
import AdminUsers from './pages/AdminUsers'
import AdminPublications from './pages/AdminPublications'
import Details from './pages/Details'
import ErrorBoundary from './pages/ErrorBoundary'
import ForgottenPassword from './pages/ForgottenPassword'
import NewPassword from './pages/NewPassword'
import MyPublications from './pages/MyPublications'
import MyFavourites from './pages/MyFavourites'
import MyInformation from './pages/MyInformation'
import EditPublication from './pages/EditPublication'
import UserService from './services/UserService'
import Navbar from './components/Navbar'
import LocalStorageService from './services/LocalStorageService'


const PrivateRoute = ({component: Component, componentProps, ...rest}) => {
  if(componentProps) {
    return (<Route {...rest} render={props => (
      UserService.isLogged() ?
            <Component {...props} updateUsername={componentProps} />
        : <Redirect to="/SignUp" />
      )} />
    );
  } else {
    return (
        <Route {...rest} render={props => (
          UserService.isLogged() ?
                <Component {...props} />
            : <Redirect to="/SignUp" />
        )} />
    );
  }
};

const AdminRoute = ({component: Component, ...rest}) => {
  return (
        <Route {...rest} render={props => (
          UserService.isLogged() && UserService.isAdmin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

const NotLockedRoute = ({component: Component, ...rest}) => {
  return (
        <Route {...rest} render={props => (
          UserService.isLogged() && ! UserService.isLocked() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

const OnlyPublicRoute =  ({component: Component, componentProps, ...rest}) => {
  if(componentProps) {
    return (
      <Route {...rest} render={props => (
          !UserService.isLogged() ?
                <Component {...props} updateUsername={componentProps} />
            : <Redirect to="/" />
        )} />
    );
  } else {
    return (
        <Route {...rest} render={props => (
          !UserService.isLogged() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
  }
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    }
  }

  componentDidMount(){
    this.setState({ username: LocalStorageService.getUsername() })
  }

  updateUsername = username => {
    this.setState({ username: username });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Suspense fallback={(<div>Loading</div>)}>
            <Navbar updateUsername={this.updateUsername} username={this.state.username}/>
            <Switch>
              <Route exact path="/" component={Home} />
              <OnlyPublicRoute exact path="/SignUp" component={SignUp} componentProps={this.updateUsername}/>
              <Route exact path="/List" component={List} />
              <Route exact path="/publications" component={Details} />
              <Route exact path="/error" component={ErrorBoundary} />
              <NotLockedRoute exact path="/Publish" component={Publish} />
              <AdminRoute exact path="/AdminGenerator" component={AdminGenerator} />
              <AdminRoute exact path="/AdminUsers" component={AdminUsers} />
              <AdminRoute exact path="/AdminPublications" component={AdminPublications} />
              <PrivateRoute exact path="/MyPublications" component={MyPublications} />
              <PrivateRoute exact path="/MyFavourites" component={MyFavourites} />
              <PrivateRoute exact path="/MyInformation"  component={MyInformation} componentProps={this.updateUsername} />
              <PrivateRoute exact path="/EditPublication" component={EditPublication} />
              <OnlyPublicRoute exact path="/ForgottenPassword" component={ForgottenPassword} />
              <Route exact path="/newPassword/token=:token" component={NewPassword} />
              <Route exact path="*" component={Home} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>    
    );
  }
}
           
export default App;