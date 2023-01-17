import axios from "axios";
import { ADD_TO_CART, CHANGE_QUANTITY, DELETE_FROM_CART, SET_LOCAL_STORAGE_CART } from "../constantes";


export function addToCart(data) {
    return ({
      type: ADD_TO_CART,
      payload: data
    })
};

export function deleteFromCart(data) {
  return ({
    type: DELETE_FROM_CART,
    payload: data
  })
};

export function changeQuantity(data) {
  return ({
    type: CHANGE_QUANTITY,
    payload: data
  })
};

export function setLocalStorageCart(data) {
  return ({
    type: SET_LOCAL_STORAGE_CART,
    payload: data
  })
};