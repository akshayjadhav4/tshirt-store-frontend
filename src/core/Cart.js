import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import StripCheckout from "../paymentGateway/StripCheckout";
import Paymentb from "../paymentGateway/PaypCheckout";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2 className="display-4">Load Products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addToCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckOut = () => {
    return (
      <div>
        <h2>ForCheckout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to check out!!!">
      <div className="row">
        <div className="col-4">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3 className="display-4">No items in the cart</h3>
          )}
        </div>
        <div className="col-6">
          <h3 className="text-center text-white">Payment Options</h3>

          <Paymentb products={products} setReload={setReload} />
          <br/>
          <br/>
          <StripCheckout products={products} setReload={setReload} />

        </div>
      </div>
    </Base>
  );
}
