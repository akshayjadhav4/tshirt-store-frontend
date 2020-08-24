import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getAllCategories } from "./helper/adminapicall";

function ManageCategories() {

    const [categories, setCategories] = useState([])
    const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteSelectedcategory = categoryID => {
    deleteCategory(categoryID, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base title="Welcome admin" description="Manage Categories here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
  <h2 className="text-center text-white my-3">Total {categories.length} Categories</h2>

         {
             categories.map((category , index) =>(
                <div className="row text-center justify-content-center mb-2 " key={index}>
                <div className="col-5">
             <h3 className="text-white text-left">{category.name}</h3>
                </div>
                
                <div className="col-5">
                  <button onClick={() => {deleteSelectedcategory(category._id)}} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
             ))
         }
        </div>
      </div>
    </Base>
  );
}

export default ManageCategories;
