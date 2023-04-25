import axios from "axios";
import { GET_STORES_FAIL, GET_STORES_REQUEST, GET_STORES_SUCCESS, STORE_CREATE_FAIL, STORE_CREATE_REQUEST, STORE_CREATE_SUCCESS, STORE_DELETE_FAIL, STORE_DELETE_REQUEST, STORE_DELETE_SUCCESS, STORE_DETAILS_FAIL, STORE_DETAILS_REQUEST, STORE_DETAILS_SUCCESS, STORE_UPDATE_FAIL, STORE_UPDATE_REQUEST, STORE_UPDATE_SUCCESS } from "../constants/storeConstants";

export const createNewStoreItem =
  (name, selling, cost, countInStock) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: STORE_CREATE_REQUEST,
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
        "api/store",
        { name, selling, cost, countInStock },
        config
      );

      dispatch({
        type: STORE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STORE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const updateStoreItem = (id,name, selling, cost, countInStock) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STORE_UPDATE_REQUEST,
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
        `/api/store/${id}`,
        {name, selling, cost, countInStock},
        config
      );
  
      dispatch({
        type: STORE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STORE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }; 
  


  export const listStoreItems = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_STORES_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/store`, config);
  
      dispatch({
        type: GET_STORES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_STORES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };



  export const listStoreItemDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: STORE_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/store/${id}`, config);
   
      dispatch({
        type: STORE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STORE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const deleteStoreItem = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STORE_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/store/${id}`, config);
  
      dispatch({
        type: STORE_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: STORE_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };