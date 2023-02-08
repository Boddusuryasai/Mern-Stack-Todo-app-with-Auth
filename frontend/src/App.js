import "./App.css";

import {Signup} from "./components/Signup";
import { Login } from "./components/Login";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
           
           <Routes>
                 <Route exact path='/' element={< Signup />}></Route>
                 <Route exact path='/login' element={< Login />}></Route>
                 <Route exact path='/dashboard' element={<Dashboard />}></Route>
                 
          </Routes>
        
       </Router>
   
  );
}

export default App;
