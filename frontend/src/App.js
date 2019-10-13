import React, { Suspense } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={(<div>Loading</div>)}>
          <Route exact path="/" component={Home} />
          <Route path="/SignUp" component={SignUp} />
        </Suspense>
     </BrowserRouter>
    </div>
  );
}

export default App;