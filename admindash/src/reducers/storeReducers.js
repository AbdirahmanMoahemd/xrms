import { GET_STORES_FAIL, GET_STORES_REQUEST, GET_STORES_RESET, GET_STORES_SUCCESS, STORE_CREATE_FAIL, STORE_CREATE_REQUEST, STORE_CREATE_RESET, STORE_CREATE_SUCCESS, STORE_DELETE_FAIL, STORE_DELETE_REQUEST, STORE_DELETE_SUCCESS, STORE_DETAILS_FAIL, STORE_DETAILS_REQUEST, STORE_DETAILS_SUCCESS, STORE_UPDATE_FAIL, STORE_UPDATE_REQUEST, STORE_UPDATE_RESET, STORE_UPDATE_SUCCESS } from "../constants/storeConstants";


export const createStoreItemReducer = (state = {}, action) => {
    switch (action.type) {
      case STORE_CREATE_REQUEST:
        return { loading: true };
      case STORE_CREATE_SUCCESS:
        return { loading: false, success: true, items: action.payload };
      case STORE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case STORE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const storeItemListReducer = (state = { items: [] }, action) => {
    switch (action.type) {
      case GET_STORES_REQUEST:
        return { loading: true };
      case GET_STORES_SUCCESS:
        return {
          loading: false,
          items: action.payload.items,
        };
      case GET_STORES_FAIL:
        return { loading: false, error: action.payload };
      case GET_STORES_RESET:
        return { items: [] };
      default:
        return state;
    }
  };


  export const storeItemDetailsReducer = (state = { item: {} }, action) => {
    switch (action.type) {
      case STORE_DETAILS_REQUEST:
        return { loading: true, ...state };
      case STORE_DETAILS_SUCCESS:
        return { loading: false, item: action.payload };
      case STORE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const storeItemUpdateReducer = (state = { item: {} }, action) => {
    switch (action.type) {
      case STORE_UPDATE_REQUEST:
        return { loading: true };
      case STORE_UPDATE_SUCCESS:
        return { loading: false, success: true, item: action.payload };
      case STORE_UPDATE_RESET:
        return { item: {} };
      case STORE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };



  export const storeItemDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case STORE_DELETE_REQUEST:
        return { loading: true };
      case STORE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case STORE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };