import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategories, getProduct , updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
function UpdateProduct({match}) {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    error,
    photo,
    createdProduct,
    getRedirect,
    formData
  } = values;

  const preLoad = (productID) => {
    getProduct(productID).then(data => {
      //   console.log(data);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({...values,
            name : data.name,
            description : data.description,
            price : data.price,
            category : data.category._id,
            stock : data.stock,
            formData : new FormData(),
        });
        preLoadCategories()
      }
    });
  };

  const preLoadCategories =()=>{
      getAllCategories().then(data=>{
          if (data.error) {
            setValues({ ...values, error: data.error });
          }else{
              setValues({categories : data ,formData : new FormData(),})
          }
      })
  }

  useEffect(() => {
    preLoad(match.params.productID);
  }, []);

  
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    updateProduct(match.params.productID,user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: " ",
            price: "",
            stock: " ",
            photo: " ",
            getRedirect: true,
            createdProduct: data.name,
            error: ""
          });
        }
      })
      .catch(error => console.log(error));
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} Updated Successfully</h4>
    </div>
  );
  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>Update Product Failed.</h4>
    </div>
  );
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  const redirectBar = () => {
    if (getRedirect === true) {
      return <Redirect to="/admin/dashboard" />;
    }
  };
  return (
    <Base
      title="Update Product"
      description="Welcome to product modification section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      {successMessage()}
      {errorMessage()}
      {redirectBar()}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">{createProductForm()}</div>
      </div>
    </Base>
  );
}

export default UpdateProduct;
