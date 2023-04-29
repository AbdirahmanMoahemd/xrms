import {
    GET_EXPENSES_FAIL,
    GET_EXPENSES_REQUEST,
    GET_EXPENSES_SUCCESS,
    EXPENSE_DELETE_FAIL,
    EXPENSE_DELETE_REQUEST,
    EXPENSE_DELETE_SUCCESS,
    EXPENSE_DETAILS_FAIL,
    EXPENSE_DETAILS_REQUEST,
    EXPENSE_DETAILS_SUCCESS,
    EXPENSE_CREATE_FAIL,
    EXPENSE_CREATE_REQUEST,
    EXPENSE_CREATE_SUCCESS,
    EXPENSE_UPDATE_FAIL,
    EXPENSE_UPDATE_REQUEST,
    EXPENSE_UPDATE_SUCCESS,
    EXPENSE_CREATE_RESET,
    GET_EXPENSES_RESET,
    EXPENSE_UPDATE_RESET,
    BLANCE_DETAILS_REQUEST,
    BLANCE_DETAILS_FAIL,
    BLANCE_DETAILS_SUCCESS,
  } from "../constants/expenseConstants";


export const createExpenseItemReducer = (state = {}, action) => {
    switch (action.type) {
      case EXPENSE_CREATE_REQUEST:
        return { loading: true };
      case EXPENSE_CREATE_SUCCESS:
        return { loading: false, success: true, items: action.payload };
      case EXPENSE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EXPENSE_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const expenseItemListReducer = (state = { items: [] }, action) => {
    switch (action.type) {
      case GET_EXPENSES_REQUEST:
        return { loading: true };
      case GET_EXPENSES_SUCCESS:
        return {
          loading: false,
          items: action.payload.items,
        };
      case GET_EXPENSES_FAIL:
        return { loading: false, error: action.payload };
      case GET_EXPENSES_RESET:
        return { items: [] };
      default:
        return state;
    }
  };


  export const expenseItemDetailsReducer = (state = { item: {} }, action) => {
    switch (action.type) {
      case EXPENSE_DETAILS_REQUEST:
        return { loading: true, ...state };
      case EXPENSE_DETAILS_SUCCESS:
        return { loading: false, item: action.payload };
      case EXPENSE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const expenseItemUpdateReducer = (state = { item: {} }, action) => {
    switch (action.type) {
      case EXPENSE_UPDATE_REQUEST:
        return { loading: true };
      case EXPENSE_UPDATE_SUCCESS:
        return { loading: false, success: true, item: action.payload };
      case EXPENSE_UPDATE_RESET:
        return { item: {} };
      case EXPENSE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };



  export const expenseItemDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EXPENSE_DELETE_REQUEST:
        return { loading: true };
      case EXPENSE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case EXPENSE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const blanceReducerCount = (state = { counter:{} }, action) => {
    switch (action.type) {
      case BLANCE_DETAILS_REQUEST:
        return { loading: true, counter:{} };
      case BLANCE_DETAILS_SUCCESS:
        return {
          loading: false,
          counter: action.payload,
          
        };
      case BLANCE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };