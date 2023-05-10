import { SALES_CREATE_FAIL, SALES_CREATE_REQUEST, SALES_CREATE_RESET, SALES_CREATE_SUCCESS, SALES_DELETE_FAIL, SALES_DELETE_REQUEST, SALES_DELETE_SUCCESS, SALES_DETAILS_FAIL, SALES_DETAILS_REQUEST, SALES_DETAILS_SUCCESS, SALES_LIST_FAIL, SALES_LIST_REQUEST, SALES_LIST_RESET, SALES_LIST_SUCCESS, SALES_UPDATE_FAIL, SALES_UPDATE_REQUEST, SALES_UPDATE_RESET, SALES_UPDATE_SUCCESS } from "../constants/salesConstants";


export const createSalesReducer = (state = {}, action) => {
    switch (action.type) {
      case SALES_CREATE_REQUEST:
        return { loading: true };
      case SALES_CREATE_SUCCESS:
        return { loading: false, success: true, sales: action.payload };
      case SALES_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case SALES_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const salesListReducer = (state = { sales: [ ], item:{}, customer:{} }, action) => {
    switch (action.type) {
      case SALES_LIST_REQUEST:
        return { loading: true };
      case SALES_LIST_SUCCESS:
        return {
          loading: false,
          sales: action.payload.sales,
        };
      case SALES_LIST_FAIL:
        return { loading: false, error: action.payload };
      case SALES_LIST_RESET:
        return { sales: [] };
      default:
        return state;
    }
  };


  export const salesDetailsReducer = (state = { sale: {} }, action) => {
    switch (action.type) {
      case SALES_DETAILS_REQUEST:
        return { loading: true, ...state };
      case SALES_DETAILS_SUCCESS:
        return { loading: false, sale: action.payload };
      case SALES_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const salesUpdateReducer = (state = { sale: {} }, action) => {
    switch (action.type) {
      case SALES_UPDATE_REQUEST:
        return { loading: true };
      case SALES_UPDATE_SUCCESS:
        return { loading: false, success: true, sale: action.payload };
      case SALES_UPDATE_RESET:
        return { sale: {} };
      case SALES_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };



  export const salesDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SALES_DELETE_REQUEST:
        return { loading: true };
      case SALES_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SALES_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };