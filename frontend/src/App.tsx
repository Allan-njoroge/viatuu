import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";

import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoutes from "./lib/ProtectedRoutes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={ <Auth /> } />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={ <Shop /> } />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

      </Routes>
      <Toaster />
    </>
  );
}

export default App;
