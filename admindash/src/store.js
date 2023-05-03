import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";



import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userReducerCount,
  userRegisterReducer,
  userUpdateReducer,
  userUpdReducer,
  userUpdatePasswordReducer,
} from "./reducers/userReducers";

import {createTaskReducer, taskDeleteReducer, tasksBinReducer, tasksDetailsReducer, tasksListInBinReducer, tasksListReducer, tasksUnBinReducer, tasksUpdateReducer, tasksUpdateStageReducer} from './reducers/tasksReducers'
import { createStoreItemReducer, storeItemDeleteReducer, storeItemDetailsReducer, storeItemListReducer, storeItemUpdateReducer } from "./reducers/storeReducers";
import { createIncomeItemReducer, incomeItemDeleteReducer, incomeItemDetailsReducer, incomeItemListReducer, incomeItemUpdateReducer } from "./reducers/incomeReducers";
import { blanceReducerCount, createExpenseItemReducer, expenseItemDeleteReducer, expenseItemDetailsReducer, expenseItemListReducer, expenseItemUpdateReducer } from "./reducers/expenseReducers";


const reducer = combineReducers({
  
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpd: userUpdReducer,
  userCount: userReducerCount,
  userUpdatePassword: userUpdatePasswordReducer,


  createTask: createTaskReducer,
  tasksList: tasksListReducer,
  taskDelete: taskDeleteReducer,
  tasksUpdate:tasksUpdateReducer,
  tasksDetails:tasksDetailsReducer,
  tasksUpdateStage:tasksUpdateStageReducer,
  tasksBin:tasksBinReducer,
  tasksListInBin:tasksListInBinReducer,
  tasksUnBin:tasksUnBinReducer,


  createStoreItem:createStoreItemReducer,
  storeItemList:storeItemListReducer,
  storeItemDelete:storeItemDeleteReducer,
  storeItemUpdate:storeItemUpdateReducer,
  storeItemDetails:storeItemDetailsReducer,


  createIncomeItem:createIncomeItemReducer,
  incomeItemList:incomeItemListReducer,
  incomeItemDelete:incomeItemDeleteReducer,
  incomeItemUpdate:incomeItemUpdateReducer,
  incomeItemDetails:incomeItemDetailsReducer,

  createExpenseItem:createExpenseItemReducer,
  expenseItemList:expenseItemListReducer,
  expenseItemDelete:expenseItemDeleteReducer,
  expenseItemUpdate:expenseItemUpdateReducer,
  expenseItemDetails:expenseItemDetailsReducer,


  blanceCount:blanceReducerCount





  
});







const middleware = [thunk];

const store = createStore(
  reducer,
  
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
