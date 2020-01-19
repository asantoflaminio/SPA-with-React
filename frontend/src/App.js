import React, { Suspense } from 'react';
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


const PrivateRoute = ({component: Component, ...rest}) => {

  return (
      <Route {...rest} render={props => (
        UserService.isLogged() ?
              <Component {...props} />
          : <Redirect to="/SignUp" />
      )} />
  );
};

const OnlyPublicRoute = ({component: Component, ...rest}) => {

  return (
      <Route {...rest} render={props => (
        !UserService.isLogged() ?
              <Component {...props} />
          : <Redirect to="/" />
      )} />
  );
};


function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={(<div>Loading</div>)}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/List" component={List} />
            <Route exact path="/publications" component={Details} />
            <Route exact path="/error" component={ErrorBoundary} />
            <PrivateRoute exact path="/Publish" component={Publish} />
            <PrivateRoute exact path="/AdminGenerator" component={AdminGenerator} />
            <PrivateRoute exact path="/AdminUsers" component={AdminUsers} />
            <PrivateRoute exact path="/AdminPublications" component={AdminPublications} />
            <PrivateRoute exact path="/MyPublications" component={MyPublications} />
            <PrivateRoute exact path="/MyFavourites" component={MyFavourites} />
            <PrivateRoute exact path="/MyInformation" component={MyInformation} />
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
           
export default App;