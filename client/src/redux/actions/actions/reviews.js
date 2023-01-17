import axios from "axios";
import { GET_REVIEWS, POST_ACTIVITY_REVIEW, POST_PRODUCT_REVIEW } from "../constantes";

let { REACT_APP_BASE_URL } = process.env


export function getReviews() {
  return async function (dispatch) {
    try {
      let reviews = await axios.get(`${REACT_APP_BASE_URL}/reviews`, {});
      return dispatch({
        type: GET_REVIEWS,
        payload: reviews.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export function createProductReview(review) {
  return async function (dispatch) {
    try {
      let reviews = await axios.post(`${REACT_APP_BASE_URL}/reviews/product`, review);
      return dispatch({
        type: POST_PRODUCT_REVIEW,
        payload: reviews.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function createActivityReview(review) {
  return async function (dispatch) {
    try {
      let reviews = await axios.post(`${REACT_APP_BASE_URL}/reviews/activity`, review);
      return dispatch({
        type: POST_ACTIVITY_REVIEW,
        payload: reviews.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

