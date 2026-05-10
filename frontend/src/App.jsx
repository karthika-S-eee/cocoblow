
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// USER PAGES
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import About from "./pages/About";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
// ADMIN PAGES
import Dashboard from "./admin/Dashboard";
import Analytics from "./admin/Analytics";
import AdminProfile from "./admin/AdminProfile";
import UpdateProduct from "./admin/UpdateProduct";
import DeleteProduct from "./admin/DeleteProduct";
import AddProduct from "./admin/AddProduct";
import AdminLogin from "./admin/AdminLogin";

// PROTECTED ROUTE
import AdminProtected from "./admin/AdminProtected";
import Ratings from "./admin/Ratings";

function App() {

  return (

    <BrowserRouter>

      {/* TOAST */}
      <Toaster position="top-right" />

      <Routes>

        {/* USER ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/order"
          element={<Order />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route 
        path="/profile"
        element={<Profile />}
        />

        {/* ADMIN LOGIN */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtected>
              <Dashboard />
            </AdminProtected>
          }
        />
         <Route
          path="/admin/ratings"
          element={
            <AdminProtected>
              <Ratings />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <AdminProtected>
              <Analytics />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <AdminProtected>
              <AdminProfile />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/updateProduct"
          element={
            <AdminProtected>
              <UpdateProduct />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/deleteProduct"
          element={
            <AdminProtected>
              <DeleteProduct />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/addProduct"
          element={
            <AdminProtected>
              <AddProduct />
            </AdminProtected>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;