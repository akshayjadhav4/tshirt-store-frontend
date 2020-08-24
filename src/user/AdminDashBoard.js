import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card border-dark">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/categories">
              Manage Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/create/product">
              Add Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-success" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Profile</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="bg-success mr-2 p-2 rounded text-white"> Name :</span>{name}
          </li>
          <li className="list-group-item">
            <span className="bg-success mr-2 p-2 rounded text-white"> Email :</span>{email}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to Admin section"
      description="Manage all of your products here."
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-lg-3">{adminLeftSide()}</div>
        <div className="col-lg-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
