
import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect, useState } from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import { loadUser } from './actions/userAction';
import store from "./store";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import UpdatePassword from './component/User/UpdatePassword.js';
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { AuBankAccountElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList.js";
import NewProduct  from "./component/admin/newProduct";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import About from "./component/layout/Header/about.js";
import Contact from "./component/layout/Header/contact";

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");  

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();

  }, []);
  return (


    <Router>
      {isAuthenticated && <UserOptions user={user} />}

      <Header />

      <Routes>


        <Route exact path="/" element={<Home />} />

        <Route exact path="/product/:id" element={<ProductDetails />} />

        <Route exact path="/products" element={<Products />} />

        
        <Route exact path="/about" element={<About />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />


        <Route exact path="/account" element={<ProtectedRoute />}> </Route>

        <Route exact path="/me/update" element={<UpdateProfile/>}></Route>


        <Route exact path="/password/update" element={<UpdatePassword/>}></Route>



        <Route exact path="/password/forgot" element={<ForgotPassword/>}></Route>

        <Route exact path="/password/reset/:token" element={<ResetPassword/>}></Route>

        <Route exact path="/login" element={<LoginSignUp />}></Route>

        <Route exact path="/cart" element={<Cart />}></Route>

        <Route exact path="/login/shipping" element={<Shipping />}></Route>

        <Route exact path="/order/confirm" element={<ConfirmOrder />}></Route>

        </Routes>

        <Elements stripe={loadStripe(stripeApiKey)}> 
      <Routes>
        <Route path="/process/payment" element={<Payment />} />
        </Routes>
      </Elements>

<Routes>
      <Route exact path="/success" element={<OrderSuccess />} />
        <Route exact path="/orders" element={<MyOrders />} />
       <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact path="/order/:id" element={<OrderDetails />} />
        <Route  path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/:products" element={<ProductList />} />

        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />

        {/* 
        
        
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/order/:id" element={<ProcessOrder />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />  */}
        
        </Routes>
      <Footer />

    </Router>

  );
}

export default App;
