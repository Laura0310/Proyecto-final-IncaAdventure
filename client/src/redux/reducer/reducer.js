import {
  GET_USERS,
  POST_USER,
  GET_SERVICES,
  GET_REVIEWS,
  DELETE_FROM_CART,
  ADD_TO_CART,
  CHANGE_QUANTITY,
  GET_DETAIL,
  SET_LOCAL_STORAGE_CART,
  POST_ACTIVITY_REVIEW,
  POST_PRODUCT_REVIEW,
  GET_PRODUCTS,
  GET_ACTIVITIES,
} from "../actions/constantes";

let initialState = {
  allUsers: [],
  allReviews: [],
  allProducts: [],
  allActivities: [],
  userProfile: {},
  userServices: {},
  shoppingCart: [],
  detail: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    case POST_USER:
      return {
        ...state,
        userProfile: action.payload
      };
    case GET_SERVICES:
      return {
        ...state,
        userServices: { ...action.payload }
      };
    case GET_REVIEWS:
      return {
        ...state,
        allReviews: action.payload
      };
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload
      };
    case ADD_TO_CART:
      let index = state.shoppingCart.findIndex((e) => e.id === action.payload.id && e.category === action.payload.category)

      let arr = [...state.shoppingCart]
      index == -1 ? arr.push(action.payload) : arr[index].quantity++
      window.localStorage.setItem('shoppingCart', JSON.stringify(arr));

      return {
        ...state,
        shoppingCart: arr
      };
    case DELETE_FROM_CART:
      let arr2 = state.shoppingCart.filter((e) =>
        e.category !== action.payload.category && e.id !== action.payload.id ||
        e.category == action.payload.category && e.id !== action.payload.id ||
        e.category !== action.payload.category && e.id == action.payload.id
      )
      window.localStorage.setItem('shoppingCart', JSON.stringify(arr2));

      return {
        ...state,
        shoppingCart: arr2
      };
    case CHANGE_QUANTITY:
      let newState = [...state.shoppingCart]
      newState[action.payload.index].quantity = action.payload.quantity
      window.localStorage.setItem('shoppingCart', JSON.stringify(newState));

      return {
        ...state,
        shoppingCart: newState
      };
    case SET_LOCAL_STORAGE_CART:
      return {
        ...state,
        shoppingCart: action.payload
      };
    default:
      return {
        ...state
      };
  };
};

export default rootReducer;