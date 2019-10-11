import React, { Suspense } from 'react';
import './App.css';
import SignUp from './pages/SignUp';


function App() {
  return (
    <div className="App">
     <Suspense fallback={(<div>Loading</div>)}>
     <SignUp></SignUp>
     </Suspense>
    </div>
  );
}

export default App;
