import './App.css';
import './CSS/headerstyle.css';
import './CSS/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import Admindashboard from './pages/admin-panel/admindashboard';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/adminDashboard' element={<Admindashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
