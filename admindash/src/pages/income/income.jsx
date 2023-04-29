import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { GET_STORES_RESET } from "../../constants/storeConstants";
import { confirmAlert } from "react-confirm-alert";
import { deleteIncomeItem, listIncomeItems } from "../../actions/incomeActions";
import { Dialog } from "primereact/dialog";

const IncomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [message, setMessage] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const incomeItemList = useSelector((state) => state.incomeItemList);
  const { loading, error, items } = incomeItemList;

  const storeItemDelete = useSelector((state) => state.storeItemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = storeItemDelete;

  useEffect(() => {
    dispatch({ type: GET_STORES_RESET });

    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listIncomeItems());
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const onClickFn = () => {
    navigate("/add-income");
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
          onClick: () => dispatch(deleteIncomeItem(id)),
        },
      ],
    });
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Dialog
        header="Reference"
        visible={message}
        onHide={() => setMessage(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <p className="m-0">{text}</p>
      </Dialog>
      <Header
        category="Page"
        title="Income"
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
              <td>Reference</td>
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
                    <td>{item.date.substring(0, 10)}</td>
                    <td>
                      <Button
                        label=""
                        icon="pi pi-comment"
                        onClick={() => {
                          setMessage(true);
                          setText(item.comment);
                        }}
                      />
                    </td>
                    <td>
                     {item ?   <Link to={`/update-income/${item._id}`}>
                        <Button label="" icon="pi pi-file-edit" />
                      </Link> : ''}
                    </td>
                    <td>
                      <Button
                        className="text-red-700"
                        label=""
                        icon="pi pi-delete-left"
                        onClick={() => deleteStoreItems(item._id)}
                      />
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

export default IncomeScreen;
