import axios from "axios";
import { GET_USERS, POST_USER, GET_SERVICES } from "../constantes";
const {
  REACT_APP_BASE_URL
} = process.env;

export function getUsers(params) {
  return async function (dispatch) {
    try {
      let users = await axios.get(`${REACT_APP_BASE_URL}/users`, { params });
      return dispatch({
        type: GET_USERS,
        payload: users.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function createUser(user) {
  return async function (dispatch) {
    try {
      let newUser = {
        last_name: user.family_name || "",
        first_name: user.given_name || "",
        email: user.email,
      };
      const userCreated = await axios.post(`${REACT_APP_BASE_URL}/users`, newUser);
      window.localStorage.setItem("user_id", userCreated.data[0].id)
      return dispatch({
        type: POST_USER,
        payload: userCreated.data[0]
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function userUpdated(newData) {
  return async function (dispatch) {
    let userUpdated = await axios.put(`${REACT_APP_BASE_URL}/users`, newData);
    return userUpdated
  };
};

export function getServices(id) {
  return async function (dispatch) {
    let services = await axios.get(`${REACT_APP_BASE_URL}/profile/services?idUser=${id}`);
    return dispatch({
      type: GET_SERVICES,
      payload: services.data
    })
  };
};


