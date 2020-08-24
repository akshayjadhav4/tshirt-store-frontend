import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "../core/helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";


function StripCheckout({ products, setReload = f => f, reload = undefined }) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userID = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  // const errorMessage = () =>{}

  const makePayment = token => {
    const body = {
      token , products
    }
    const headers = {
      "Content-Type" : "application/json"
    }
    return fetch(`${API}/stripepayment`,{
      method : "POST",
      headers,
      body : JSON.stringify(body)
    }).then(response => {
      // console.log(response);
      const {status}  = response
      console.log(status);
      cartEmpty(()=>{
        console.log('Cart Cleard');
      })
      setReload(!reload)
       
    }).catch(error =>console.log(error)
    )
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey= {process.env.REACT_APP_PUBLIC_KEY}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="MERN Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success btn-block ">Pay With Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-info">Sign In</button>
      </Link>
    );
  };
  return (
    <div>
      
      {showStripeButton()}
    </div>
  );
}

export default StripCheckout;
