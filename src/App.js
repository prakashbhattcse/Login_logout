
import './App.css';
import Homepage from './components/homepage/homepage';
import Register from './components/register/register';
import Login from './components/login/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
        {/* <Route path='/' element={<Homepage/>}/> */}
          <Route path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>



//  <div className="App">
// <Router>
//   <Switch>
//     <Route exact path="/">
//       {
//         user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
//       }
//     </Route>
//     <Route path="/login">
//       <Login setLoginUser={setLoginUser}/>
//     </Route>
//     <Route path="/register">
//       <Register />
//     </Route>
//   </Switch>
// </Router>
// </div> 


  );
}




export default App;



