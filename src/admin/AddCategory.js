import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backend request
    createCategory(user._id, token, { name })
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch(error => console.log("AddCategory Error"));
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully.</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create category.</h4>;
    }
  };
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-dark mb-3 btn-sm" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );
  const addCategoryForm = () => (
    <form className="m-2">
      <div className="form-group">
        <label>Enter Category Name</label>
        <input
          type="text"
          className="form-control my-3"
          name=""
          placeholder="e.g. Summer"
          autoFocus
          required
          onChange={handleChange}
          value={name}
        />
      </div>
      <button onClick={onSubmit} className="btn btn-outline-info btn-block ">
        Submit
      </button>
    </form>
  );

  return (
    <Base
      title="Create Category"
      description="Add new category for product."
      className="container bg-success p-4 "
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {addCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
}

export default AddCategory;
