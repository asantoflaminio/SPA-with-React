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
import LocalStorageService from './services/LocalStorageService'



const PrivateRoute = ({component: Component, ...rest}) => {
  function isLogin(){
    if(LocalStorageService.getAccessToken() != null)
      return true;
    else
      return false;
  }

  return (
      <Route {...rest} render={props => (
          isLogin() ?
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
          <Route exact path="/" component={Home} />
          <Route path="/SignUp" component={SignUp} />
          <PrivateRoute path="/Publish" component={Publish} />
          <Route path="/AdminGenerator" component={AdminGenerator} />
          <Route path="/AdminUsers" component={AdminUsers} />
          <Route path="/List" component={List} />
          <Route path="/publication" component={Details} />
          <Route path="/error" component={ErrorBoundary} />
          <Route path="/MyPublications" component={MyPublications} />
          <Route path="/MyFavorites" component={MyFavorites} />
          <Route path="/MyInformation" component={MyInformation} />
          <Route path="/EditPublication" component={EditPublication} />
        </Suspense>
     </BrowserRouter>
    </div>
    
  );
}

export default App;