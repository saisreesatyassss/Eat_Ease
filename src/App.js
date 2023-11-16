 

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/navabar";
import Footer  from "./components/Footer";
import SignIn from "./components/SignIn/signin";
import Main from "./pages/main";
import Profile from './pages/profile';
import Contact from './pages/contact';
import Login from './pages/login';
import EatClips from './pages/eatclips';
import Restaurants from './pages/restaurants';
import Menu from './pages/menu';
import Cart from './pages/cart';

 

function App() {
  return (
    <Router>
        <div>
        <Navbar/>
   
     <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile/>} />   
      <Route path="/contact" element={<Contact/>} />   
      <Route path="/eatclips" element={<EatClips/>} />   
      <Route path="/restaurants" element={<Restaurants/>} />   
      <Route path="/menus/:restaurantId" element={<Menu />} />
      <Route path="/cart" element={<Cart/>} />

    </Routes>

        <Footer/>

        </div>
    </Router>
  );
}

export default App;