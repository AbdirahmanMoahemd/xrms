import {
  BIN_TASKS_FAIL,
  BIN_TASKS_REQUEST,
  BIN_TASKS_SUCCESS,
  GET_BIN_TASKS_FAIL,
  GET_BIN_TASKS_REQUEST,
  GET_BIN_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  UNBIN_TASKS_FAIL,
  UNBIN_TASKS_REQUEST,
  UNBIN_TASKS_SUCCESS,
  UPDATE_TASKS_FAIL,
  UPDATE_TASKS_REQUEST,
  UPDATE_TASKS_STAGE_FAIL,
  UPDATE_TASKS_STAGE_REQUEST,
  UPDATE_TASKS_STAGE_SUCCESS,
  UPDATE_TASKS_SUCCESS,
} from "../constants/tasksConstants";
import axios from "axios";

export const createNewTask =
  (name, phone, item, problem, date, amount, userid, comment) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TASK_CREATE_REQUEST,
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
        "api/tasks",
        { name, phone, item, problem, date, amount, userid, comment },
        config
      );

      dispatch({
        type: TASK_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TASK_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTasks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks`, config);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export const listTasksInBin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_BIN_TASKS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/tasks/bin/list', config);

    dispatch({
      type: GET_BIN_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BIN_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};





export const listTaskstDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tasks/${id}`, config);
 
    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTasks = (id, name, phone, item, problem, date, amount, stage, comment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASKS_REQUEST,
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
      `/api/tasks/${id}`,
      {name, phone, item, problem, date, amount,stage, comment},
      config
    );

    dispatch({
      type: UPDATE_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateTasksStage = (id, stage) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_TASKS_STAGE_REQUEST,
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
      `/api/tasks/stage/${id}`,
      {stage},
      config
    );

    dispatch({
      type: UPDATE_TASKS_STAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TASKS_STAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const updateTasksToBin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BIN_TASKS_REQUEST,
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
      `/api/tasks/bin/${id}`,{},
      config
    );

    dispatch({
      type: BIN_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BIN_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateTasksToUnBin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNBIN_TASKS_REQUEST,
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
      `/api/tasks/restore/${id}`,{},
      config
    );

    dispatch({
      type: UNBIN_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNBIN_TASKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deleteTasks = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TASK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tasks/${id}`, config);

    dispatch({
      type: TASK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
