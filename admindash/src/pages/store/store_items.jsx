import React, { useEffect } from "react";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { GET_STORES_RESET } from "../../constants/storeConstants";
import { listStoreItems } from "../../actions/storeActions";

const StoreItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const storeItemList = useSelector((state) => state.storeItemList);
  const { loading, error, items } = storeItemList;

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
      dispatch(listStoreItems());
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const onClickFn = () => {
    navigate("/add-store-item");
  };
  const { currentColor } = useStateContext();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Store"
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
              <td>NAME</td>
              <td>Cost Price</td>
              <td>Selling PRICE</td>
              <td>CountInStock</td>
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
                    <td>{item.name}</td>
                    <td>{item.cost}</td>
                    <td>{item.selling}</td>
                    <td>{item.countInStock}</td>
                    <td>
                     <Link to={`/update-store-item/${item._id}`}><Button label="" icon="pi pi-file-edit" /></Link>
                    </td>
                    <td>
                      <Button label="" icon="pi pi-delete-left" />
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

export default StoreItems;
