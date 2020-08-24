import { API } from "../../backend";

export const createOrder = (userId, token, orderInfo) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: orderInfo })
  })
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};
