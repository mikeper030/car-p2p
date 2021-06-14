import './App.css';
import Home from './HomePage';
import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Listing from './components/pages/CarListings/ListingsPage';
import NewList from './components/pages/NewList/NewList';
import FormDialogSignup from './components/pages/Auth/FormDialogSignup';
import CarDetails from './components/pages/CarDetails/CarDetails';
import AccountActionPage from "./components/pages/MyAccount/AccountActionPage";
import { Redirect } from 'react-router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide} from 'react-toastify';
import ListingPage from "./components/pages/CarListings/ListingsPage";

function App() {

  
  return (
    <BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            transition={Slide}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <Route exact path="/">
            <Redirect to="/home" />
        </Route>
      <Route exact path="/home">
        <Home />
      </Route>
        <Route exact path="/account" component={AccountActionPage} />
        
        <Route path="/signup">
        <FormDialogSignup  />
      </Route>
        
      <Route path="/listings-search">
        <ListingPage />
      </Route>
      <Route path="/new-list">
        <NewList />
      </Route>
      <Route path="/listing-details">
        <CarDetails />
      </Route>
    </BrowserRouter>

  );
}

export default App;
