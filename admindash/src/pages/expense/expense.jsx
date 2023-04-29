import React, { useEffect } from "react";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { confirmAlert } from "react-confirm-alert";
import { deleteExpenseItem, listExpenseItems } from "../../actions/expenseActions";
import { EXPENSE_CREATE_RESET, GET_EXPENSES_RESET } from "../../constants/expenseConstants";

const ExpenseScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const expenseItemList = useSelector((state) => state.expenseItemList);
  const { loading, error, items } = expenseItemList;

  const storeItemDelete = useSelector((state) => state.storeItemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = storeItemDelete;

  useEffect(() => {
    dispatch({ type: EXPENSE_CREATE_RESET });
    dispatch({ type: GET_EXPENSES_RESET });

    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listExpenseItems());
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const onClickFn = () => {
    navigate("/add-expense");
  }; 
  const { currentColor } = useStateContext();


  const deleteStoreItems = (id) => {
    confirmAlert({
      title: "Permanent Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteExpenseItem(id)),
        },
      ],
    });
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Expenses"
        btnText="Add Item"
        currentColor={currentColor}
        onClick={onClickFn}
      />
      <div className="table-responsive " style={{ overflowX: "auto" }}>
        {loadingDelete && (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
        {errorDelete && <Message severity="error" text={errorDelete} />}
        <table className="table">
          <thead>
            <tr>
              <td>Title</td>
              <td>Amount</td>
              <td>Type</td>
              <td>Date</td>
              <td>Refrence</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          {loading ? (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : error ? (
            <Message severity="error" text={error} />
          ) : (
            <>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td>{item.title}</td>
                    <td>${item.amount}</td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                    <td>{item.ref}</td>
                    <td>
                    {item ?  <Link to={`/update-expense/${item._id}`}><Button label="" icon="pi pi-file-edit" /></Link> :'' }
                    </td>
                    <td>
                    {item ? <Button className="text-red-700" label="" icon="pi pi-delete-left" onClick={()=> deleteStoreItems(item._id)} />: ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default ExpenseScreen;
