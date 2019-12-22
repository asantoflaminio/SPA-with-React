import React, { Suspense } from 'react';
import {BrowserRouter} from 'react-router-dom';
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

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={(<div>Loading</div>)}>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/SignUp" component={SignUp} />
          <PrivateRoute path="/Publish" component={Publish} />
          <Route path="/AdminGenerator" component={AdminGenerator} />
          <Route path="/AdminUsers" component={AdminUsers} />
          <Route path="/List" component={List} />
          <Route path="/publication" component={Details} />
          <Route path="/error" component={ErrorBoundary} />
          <PrivateRoute path="/MyPublications" component={MyPublications} />
          <PrivateRoute path="/MyFavorites" component={MyFavorites} />
          <PrivateRoute path="/MyInformation" component={MyInformation} />
          <PrivateRoute path="/EditPublication" component={EditPublication} />
        </Suspense>
     </BrowserRouter>
    </div>
    
  );
}

export default App;