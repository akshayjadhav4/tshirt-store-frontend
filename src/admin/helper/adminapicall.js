import { API } from "../../backend";

//Category Calls
export const createCategory = (userID, token, category) => {
  return fetch(`${API}/category/create/${userID}`, {
    //header info
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const deleteCategory = (categoryID, userID, token) => {
  return fetch(`${API}/category/${categoryID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

//Product calls
export const createProduct = (userID, token, product) => {
  return fetch(`${API}/product/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

// get  all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

//get Single product
export const getProduct = productID => {
  return fetch(`${API}/product/${productID}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

//update product
export const updateProduct = (productID, userID, token, product) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

//delete product

export const deleteProduct = (productID, userID, token) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
