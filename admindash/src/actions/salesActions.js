import axios from "axios";
import {
  SALES_CREATE_FAIL,
  SALES_CREATE_REQUEST,
  SALES_CREATE_RESET,
  SALES_CREATE_SUCCESS,
  SALES_DELETE_FAIL,
  SALES_DELETE_REQUEST,
  SALES_DELETE_SUCCESS,
  SALES_DETAILS_FAIL,
  SALES_DETAILS_REQUEST,
  SALES_DETAILS_SUCCESS,
  SALES_LIST_FAIL,
  SALES_LIST_REQUEST,
  SALES_LIST_RESET,
  SALES_LIST_SUCCESS,
  SALES_UPDATE_FAIL,
  SALES_UPDATE_REQUEST,
  SALES_UPDATE_RESET,
  SALES_UPDATE_SUCCESS,
} from "../constants/salesConstants";

export const createNewSales =
  (item, customer, quantity,price, date,isPaid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SALES_CREATE_REQUEST,
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
        "api/Sales",
        { item, customer, quantity,price, date,isPaid },
        config
      );

      dispatch({
        type: SALES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSalesItem =
  (id, item, customer, quantity,price, date,isPaid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SALES_UPDATE_REQUEST,
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
        `/api/Sales/${id}`,
        { item, customer, quantity,price, date,isPaid },
        config
      );

      dispatch({
        type: SALES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSalesItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SALES_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/Sales`, config);

    dispatch({
      type: SALES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const salesItemDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SALES_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/Sales/${id}`, config);

    dispatch({
      type: SALES_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSalesItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/Sales/${id}`, config);

    dispatch({
      type: SALES_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SALES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
