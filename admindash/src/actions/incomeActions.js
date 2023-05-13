import axios from "axios";
import {
  GET_INCOMES_FAIL,
  GET_INCOMES_REQUEST,
  GET_INCOMES_SUCCESS,
  INCOME_CREATE_FAIL,
  INCOME_CREATE_REQUEST,
  INCOME_CREATE_SUCCESS,
  INCOME_DELETE_FAIL,
  INCOME_DELETE_REQUEST,
  INCOME_DELETE_SUCCESS,
  INCOME_DETAILS_FAIL,
  INCOME_DETAILS_REQUEST,
  INCOME_DETAILS_SUCCESS,
  INCOME_UPDATE_FAIL,
  INCOME_UPDATE_REQUEST,
  INCOME_UPDATE_SUCCESS,
  TOTAL_TASKS_INCOME_FAIL,
  TOTAL_TASKS_INCOME_REQUEST,
  TOTAL_TASKS_INCOME_SUCCESS,
} from "../constants/incomeConstants";


export const createNewIncome =
  (title, amount, type, date, ref) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INCOME_CREATE_REQUEST,
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
        "api/income",
        { title, amount, type, date, ref },
        config
      );

      dispatch({
        type: INCOME_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INCOME_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateIncomeItem =
  (id, title, amount, type, date, ref) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INCOME_UPDATE_REQUEST,
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
        `/api/income/${id}`,
        { title, amount, type, date, ref },
        config
      );

      dispatch({
        type: INCOME_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INCOME_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listIncomeItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_INCOMES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/income`, config);

    dispatch({
      type: GET_INCOMES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_INCOMES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listIncomeItemDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INCOME_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/income/${id}`, config);

    dispatch({
      type: INCOME_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INCOME_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteIncomeItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INCOME_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/income/${id}`, config);

    dispatch({
      type: INCOME_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: INCOME_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getTasksTotalIncome = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOTAL_TASKS_INCOME_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/income/tasks/total", config);

    dispatch({
      type: TOTAL_TASKS_INCOME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_TASKS_INCOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};





