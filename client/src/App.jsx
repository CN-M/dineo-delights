import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import Success from './pages/Success/Success';
import Manage from './pages/Manage/Manage';
import AddressPage from './pages/AddressPage/AddressPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories/:slug" element={<CategoryPage />} />
      <Route path="/products/:slug" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/address" element={<AddressPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/manage" element={<Manage />} />
    </Routes>
  </Router>
);

export default App;
