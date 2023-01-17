import axios from "axios";
import { GET_DETAIL } from "../constantes";
const {
    REACT_APP_BASE_URL
} = process.env;


export function getDetail({ id, category }) {
    return async function (dispatch) {
        try {
            let params = { id }
            let response = await axios.get(`${REACT_APP_BASE_URL}/reviews/details/${category}`, { params });
            return dispatch({
                type: GET_DETAIL,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};