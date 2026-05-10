// import {
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import { useSelector } from "react-redux";

// /* USER PAGES */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Wishlist from "./pages/Wishlist";
// import Cart from "./pages/Cart";
// import About from "./pages/About";
// import Shop from "./pages/Shop";

// /* ADMIN PAGES */
// import AddProduct from "./admin/AddProduct";
// import AdminLogin from "./admin/AdminLogin";
// import Dashboard from "./admin/Dashboard";

// /* EXTRA */
// import NotFound from "./pages/NotFound";

// function App() {

//   // USER LOGIN
//   const user = useSelector(
//     (state) => state.auth.user
//   );

//   // ADMIN LOGIN
//   const admin = useSelector(
//     (state) => state.admin.admin
//   );

//   return (

//     <Routes>

//       {/* PUBLIC ROUTES */}

//       <Route
//         path="/"
//         element={<Home />}
//       />

//       <Route
//         path="/shop"
//         element={<Shop />}
//       />

//       <Route
//         path="/about"
//         element={<About />}
//       />

//       {/* USER AUTH */}

//       <Route
//         path="/login"
//         element={
//           user
//             ? <Navigate to="/" />
//             : <Login />
//         }
//       />

//       <Route
//         path="/register"
//         element={
//           user
//             ? <Navigate to="/" />
//             : <Register />
//         }
//       />

//       {/* USER PROTECTED */}

//       <Route
//         path="/wishlist"
//         element={
//           user
//             ? <Wishlist />
//             : <Navigate to="/login" />
//         }
//       />

//       <Route
//         path="/cart"
//         element={
//           user
//             ? <Cart />
//             : <Navigate to="/login" />
//         }
//       />

//       {/* ADMIN LOGIN */}

//       <Route
//         path="/admin/login"
//         element={
//           admin
//             ? <Navigate to="/admin/dashboard" />
//             : <AdminLogin />
//         }
//       />

//       {/* ADMIN DASHBOARD */}

//       <Route
//         path="/admin/dashboard"
//         element={
//           admin
//             ? <AddProduct />
//             : <Navigate to="/admin/login" />
//         }
//       />

//       {/* NOT FOUND */}

//       <Route
//         path="*"
//         element={<NotFound />}
//       />

//     </Routes>
//   );
// }

// export default App;


// import {
//   Routes,
//   Route,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// /* USER PAGES */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Wishlist from "./pages/Wishlist";
// import Cart from "./pages/Cart";
// import About from "./pages/About";
// import Shop from "./pages/Shop";

// /* ADMIN PAGES */
// import AddProduct from "./admin/AddProduct";
// import AdminLogin from "./admin/AdminLogin";
// import UpdateProduct from "./admin/UpdateProduct";
// import DeleteProduct from "./admin/DeleteProduct";
// import AdminProfile from "./admin/AdminProfile";

// /* EXTRA */
// import NotFound from "./pages/NotFound";
// import Dashboard from "./admin/Dashboard";
// import Analytics from "./admin/Analytics";

// function App() {

//   return (
// <><Toaster position="top-right" />
//     <Routes>

//       {/* USER ROUTES */}

//       <Route
//         path="/"
//         element={<Home />}
//       />

//       <Route
//         path="/login"
//         element={<Login />}
//       />

//       <Route
//         path="/register"
//         element={<Register />}
//       />

//       <Route
//         path="/shop"
//         element={<Shop />}
//       />

//       <Route
//         path="/wishlist"
//         element={<Wishlist />}
//       />

//       <Route
//         path="/cart"
//         element={<Cart />}
//       />

//       <Route
//         path="/about"
//         element={<About />}
//       />

//       {/* ADMIN ROUTES */}

//       <Route
//         path="/admin/login"
//         element={<AdminLogin />}
//       />

//       <Route
//         path="/admin/dashboard"
//         element={<Dashboard />}
//       />

//       <Route
//         path="/admin/addProduct"
//         element={<AddProduct />}
//       />

//       <Route
//         path="/admin/updateProduct"
//         element={<UpdateProduct />}
//       />

//       <Route
//         path="/admin/deleteProduct"
//         element={<DeleteProduct />}
//       />

//       <Route
//       path="/admin/profile"
//       element={<AdminProfile />}
//       />

//       <Route 
//       path="/admin/analytics"
//       element={<Analytics />}
//       />

//       {/* NOT FOUND */}

//       <Route
//         path="*"
//         element={<NotFound />}
//       />

//     </Routes>
//     </>
//   );
// }

// export default App;

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