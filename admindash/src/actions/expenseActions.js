import axios from "axios";
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
  BLANCE_DETAILS_FAIL,
  BLANCE_DETAILS_REQUEST,
  BLANCE_DETAILS_SUCCESS,
} from "../constants/expenseConstants";

export const createNewExpense =
  (title, amount, type, date, ref) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EXPENSE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "api/expense",
        { title, amount, type, date, ref },
        config
      );

      dispatch({
        type: EXPENSE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EXPENSE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateExpenceItem =
  (id, title, amount, type, date, ref) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EXPENSE_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/expense/${id}`,
        { title, amount, type, date, ref },
        config
      );

      dispatch({
        type: EXPENSE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EXPENSE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listExpenseItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_EXPENSES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/expense`, config);

    dispatch({
      type: GET_EXPENSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXPENSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listExpenseItemDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/expense/${id}`, config);

    dispatch({
      type: EXPENSE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteExpenseItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXPENSE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/expense/${id}`, config);

    dispatch({
      type: EXPENSE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EXPENSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getBlance = () => async (dispatch, getState) => {
    try {
      dispatch({ type: BLANCE_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get("/api/expense/total", config);
  
      dispatch({
        type: BLANCE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLANCE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };




  