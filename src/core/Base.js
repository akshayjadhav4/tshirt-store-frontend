import React from "react";
import Menu from "./Menu";

export default function Base({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children
}) {
  return (
    <div>
      <Menu/>
      <div className="container-fluid">
        <div className="bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-2  ">
        {/* <div className="container-fluid bg-success text-white text-center py-2">
          <h5>If you got any question feel free to reach out!</h5>
          <button className="btn btn-warning btn-sm">Contact Us</button>
        </div> */}
        <div className="container text-center">
          <span className="text-muted">An Amazing place to buy <span className='text-white'>T-shirts</span></span>
        </div>
      </footer>
    </div>
  );
}
