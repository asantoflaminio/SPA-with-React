import React, { Suspense } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignUpReact from './pages/SignUpReact'
import Home from './pages/Home'
import HomeReal from './pages/HomeReal'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={(<div>Loading</div>)}>
          <Route exact path="/" component={HomeReal} />
          <Route path="/SignUp" component={SignUpReact} />
        </Suspense>
     </BrowserRouter>
    </div>
  );
}

export default App;