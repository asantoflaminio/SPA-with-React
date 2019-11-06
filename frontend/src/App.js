import React, { Suspense } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home'
import List from './pages/List'
import Publish from './pages/Publish'
import AdminGenerator from './pages/AdminGenerator'
import AdminUsers from './pages/AdminUsers'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={(<div>Loading</div>)}>
          <Route exact path="/" component={Home} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Publish" component={Publish} />
          <Route path="/AdminGenerator" component={AdminGenerator} />
          <Route path="/AdminUsers" component={AdminUsers} />
          <Route path="/List" component={List} />
        </Suspense>
     </BrowserRouter>
    </div>
  );
}

export default App;