import React, { Suspense } from 'react';
import {Switch, BrowserRouter} from 'react-router-dom';
import {Route, Redirect} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home'
import List from './pages/List'
import Publish from './pages/Publish'
import AdminGenerator from './pages/AdminGenerator'
import AdminUsers from './pages/AdminUsers'
import Details from './pages/Details'
import ErrorBoundary from './pages/ErrorBoundary'
import MyPublications from './pages/MyPublications'
import MyFavorites from './pages/MyFavorites'
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


function App() {

  alert(process.env.REACT_APP_ROUTER_BASE)

  return (
    <div className="App">
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ""}>
        <Suspense fallback={(<div>Loading</div>)}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SignUp" component={SignUp} />
            <PrivateRoute exact path="/Publish" component={Publish} />
            <Route exact path="/AdminGenerator" component={AdminGenerator} />
            <Route exact path="/AdminUsers" component={AdminUsers} />
            <Route exact path="/List" component={List} />
            <Route exact path="/publication" component={Details} />
            <Route exact path="/error" component={ErrorBoundary} />
            <PrivateRoute exact path="/MyPublications" component={MyPublications} />
            <PrivateRoute exact path="/MyFavorites" component={MyFavorites} />
            <PrivateRoute exact path="/MyInformation" component={MyInformation} />
            <PrivateRoute exact path="/EditPublication" component={EditPublication} />
          </Switch>
        </Suspense>
     </BrowserRouter>
    </div>
    
  );
}
//            <Route exact path="*" component={Home} />
export default App;