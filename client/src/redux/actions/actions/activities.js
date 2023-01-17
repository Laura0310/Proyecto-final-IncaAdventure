import axios from "axios";
import { GET_ACTIVITIES } from "../constantes";
const {
  REACT_APP_BASE_URL
} = process.env;

export function getActivities(params) {
  return async function (dispatch) {
    try {
      let activities = await axios.get(`${REACT_APP_BASE_URL}/activities`, { params });
      return dispatch({
        type: GET_ACTIVITIES,
        payload: activities.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function activityUpdated(newData) {
  return async function (dispatch) {
    let activityUpdated = await axios.put(`${REACT_APP_BASE_URL}/activities`, newData);
    return activityUpdated
  };
};


export function postActivities(payload) {
  return async function (dispatch) {
    var response = await axios.post(`${REACT_APP_BASE_URL}/activities`, payload)
    return response;
  }
}
