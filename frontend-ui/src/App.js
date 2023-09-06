import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admindashboard from './pages/admin-panel/Admindashboard';
import PageNotFound from './PageNotFound';
import CreateAdmin from './pages/admin-panel/CreateAdmin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/admin/dashboard' element={<Admindashboard/>} ></Route>
          <Route path='/admin/create-Admin' element={<CreateAdmin/>} ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
