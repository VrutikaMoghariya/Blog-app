import './App.css';
import './CSS/headerstyle.css';
import './CSS/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './pages/Header';
import Signup from './pages/signup';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route element={<Blogs/>}>
            <Route path='/blogs' element={<Blogs />}></Route>
          </Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
