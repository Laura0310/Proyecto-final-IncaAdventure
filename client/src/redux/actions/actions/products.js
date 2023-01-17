import axios from "axios";
import { GET_PRODUCTS } from "../constantes";
const {
  REACT_APP_BASE_URL
} = process.env;

export function getProducts(params) {
  return async function (dispatch) {
    try {
      let products = await axios.get(`${REACT_APP_BASE_URL}/products`, { params });
      return dispatch({
        type: GET_PRODUCTS,
        payload: products.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export function productUpdated(newData) {
  return async function (dispatch) {
    let productUpdated = await axios.put(`${REACT_APP_BASE_URL}/products`, newData);
    return productUpdated
  };
};

export function postProduct(payload) {
  return async function (dispatch) {
    var response = await axios.post(`${REACT_APP_BASE_URL}/products`, payload)
    return response;
  }
}