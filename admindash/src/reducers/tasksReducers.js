import {
  GET_TASKS_FAIL,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_CREATE_RESET,
  GET_TASKS_RESET,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_REQUEST,
  UPDATE_TASKS_RESET,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_REQUEST,
  UPDATE_TASKS_FAIL,
  BIN_TASKS_RESET,
  BIN_TASKS_REQUEST,
  BIN_TASKS_SUCCESS,
  BIN_TASKS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  UPDATE_TASKS_STAGE_REQUEST,
  UPDATE_TASKS_STAGE_SUCCESS,
  UPDATE_TASKS_STAGE_RESET,
  UPDATE_TASKS_STAGE_FAIL,
  GET_BIN_TASKS_REQUEST,
  GET_BIN_TASKS_SUCCESS,
  GET_BIN_TASKS_FAIL,
  GET_BIN_TASKS_RESET,
} from "../constants/tasksConstants";

export const createTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return { loading: true };
    case TASK_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case TASK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const tasksListReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return { loading: true };
    case GET_TASKS_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
      };
    case GET_TASKS_FAIL:
      return { loading: false, error: action.payload };
    case GET_TASKS_RESET:
      return { tasks: [] };
    default:
      return state;
  }
};


export const tasksListInBinReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case GET_BIN_TASKS_REQUEST:
      return { loading: true };
    case GET_BIN_TASKS_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
      };
    case GET_BIN_TASKS_FAIL:
      return { loading: false, error: action.payload };
    case GET_BIN_TASKS_RESET:
      return { tasks: [] };
    default:
      return state;
  }
};



export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const tasksBinReducer = (state = { }, action) => {
  switch (action.type) {
    case BIN_TASKS_REQUEST:
      return { loading: true };
    case BIN_TASKS_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case BIN_TASKS_RESET:
      return { task: {} };
    case BIN_TASKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const tasksUpdateReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case UPDATE_TASKS_REQUEST:
      return { loading: true };
    case UPDATE_TASKS_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case UPDATE_TASKS_RESET:
      return { task: {} };
    case UPDATE_TASKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};





export const tasksDetailsReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tasksUpdateStageReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case UPDATE_TASKS_STAGE_REQUEST:
      return { loading: true };
    case UPDATE_TASKS_STAGE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case UPDATE_TASKS_STAGE_RESET:
      return { task: {} }; 
    case UPDATE_TASKS_STAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
