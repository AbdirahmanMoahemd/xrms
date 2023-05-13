import {
  GET_INCOMES_FAIL,
  GET_INCOMES_REQUEST,
  GET_INCOMES_RESET,
  GET_INCOMES_SUCCESS,
  INCOME_CREATE_FAIL,
  INCOME_CREATE_REQUEST,
  INCOME_CREATE_RESET,
  INCOME_CREATE_SUCCESS,
  INCOME_DELETE_FAIL,
  INCOME_DELETE_REQUEST,
  INCOME_DELETE_SUCCESS,
  INCOME_DETAILS_FAIL,
  INCOME_DETAILS_REQUEST,
  INCOME_DETAILS_SUCCESS,
  INCOME_UPDATE_FAIL,
  INCOME_UPDATE_REQUEST,
  INCOME_UPDATE_RESET,
  INCOME_UPDATE_SUCCESS,
  TOTAL_TASKS_INCOME_FAIL,
  TOTAL_TASKS_INCOME_REQUEST,
  TOTAL_TASKS_INCOME_SUCCESS,
} from "../constants/incomeConstants";

export const createIncomeItemReducer = (state = {}, action) => {
  switch (action.type) {
    case INCOME_CREATE_REQUEST:
      return { loading: true };
    case INCOME_CREATE_SUCCESS:
      return { loading: false, success: true, items: action.payload };
    case INCOME_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case INCOME_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const incomeItemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case GET_INCOMES_REQUEST:
      return { loading: true };
    case GET_INCOMES_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
      };
    case GET_INCOMES_FAIL:
      return { loading: false, error: action.payload };
    case GET_INCOMES_RESET:
      return { items: [] };
    default:
      return state;
  }
};

export const incomeItemDetailsReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case INCOME_DETAILS_REQUEST:
      return { loading: true, ...state };
    case INCOME_DETAILS_SUCCESS:
      return { loading: false, item: action.payload };
    case INCOME_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const incomeItemUpdateReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case INCOME_UPDATE_REQUEST:
      return { loading: true };
    case INCOME_UPDATE_SUCCESS:
      return { loading: false, success: true, item: action.payload };
    case INCOME_UPDATE_RESET:
      return { item: {} };
    case INCOME_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const incomeItemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INCOME_DELETE_REQUEST:
      return { loading: true };
    case INCOME_DELETE_SUCCESS:
      return { loading: false, success: true };
    case INCOME_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const totalTasksIncomeReducerCount = (state = { counter:{} }, action) => {
  switch (action.type) {
    case TOTAL_TASKS_INCOME_REQUEST:
      return { loading: true, counter:{} };
    case TOTAL_TASKS_INCOME_SUCCESS:
      return {
        loading: false,
        counter: action.payload,
        
      };
    case TOTAL_TASKS_INCOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};




