import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { AutoComplete } from "primereact/autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { listStoreItems } from "../../actions/storeActions";
import { listCustomers } from "../../actions/cusomerActions";

import { Checkbox } from "primereact/checkbox";
import { createNewSales, listSalesItems } from "../../actions/salesActions";
import { SALES_CREATE_RESET, SALES_LIST_RESET } from "../../constants/salesConstants";

const SalesScreen = () => {
  const [item, setItem] = useState("");
  const [customer, setCustomer] = useState();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [isPaid, setIsPaid] = useState(false);
  const [create, setCreate] = useState(false);
  const { currentColor } = useStateContext();

  const dispatch = useDispatch();
  const salesList = useSelector((state) => state.salesList);
  const { loading: loadingSales, error: errorSales, sales } = salesList;

  const storeItemList = useSelector((state) => state.storeItemList);
  const { loading, error, items } = storeItemList;

  const createSales = useSelector((state) => state.createSales);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createSales;

  const customersList = useSelector((state) => state.customersList);
  const {
    loading: loadingCustomer,
    error: errorCustomer,
    customers,
  } = customersList;

  useEffect(() => {
    dispatch(listStoreItems());
  }, [dispatch]);

  useEffect(() => {
    
    dispatch(listSalesItems());
  }, [dispatch, successCreate]);

  useEffect(() => {
    dispatch({ type: SALES_CREATE_RESET });
    if (successCreate) {
      setCreate(false);
      setItem("");
      setCustomer("");
      setQuantity("");
      setPrice("");
      setIsPaid(false);
      setDate(new Date());
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    dispatch(listCustomers());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(createNewSales(item, customer, quantity, price, date, isPaid));
  };

  const onClickFn = () => {
    setCreate(true);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Sales"
        btnText="Add New"
        currentColor={currentColor}
        onClick={onClickFn}
      />
      <table className="table">
        <thead>
          <tr>
            <td>Item Name</td>
            <td>Customer</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Date</td>
            <td>Billing Status</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        {loadingSales ? (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        ) : errorSales ? (
          <Message severity="error" text={errorSales} />
        ) : (
          <tbody>
            {sales.map((sale) => (
              <tr id={sale._id}>
                <td>{sale.item && sale.item.name}</td>
                <td>{sale.customer && sale.customer.name}</td>
                <td>{sale.quantity}</td>
                <td>${sale.price}</td>
                <td>{ sale.date && sale.date.substring(0, 10)}</td>
                <td>
                  {sale.isPaid ? (
                    <i className="pi pi-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="pi pi-times" style={{ color: "red" }}></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {/* create sales */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="New Sale Order"
        visible={create}
        onHide={() => {
          setCreate(false);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={submitHandler}>
          {loadingCreate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCreate && <Message severity="error" text={errorCreate} />}
          <div className="space-y-4 ">
            <div>
              <label className="text-gray-600 mb-2 block">
                Item Name <span className="text-primary">*</span>
              </label>
              <AutoComplete
                placeholder="item name"
                inputStyle={{ width: "37vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                field="name"
                value={item}
                suggestions={items}
                completeMethod={() => dispatch(listStoreItems())}
                onChange={(e) => setItem(e.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Customer Name <span className="text-primary">*</span>
              </label>
              <AutoComplete
                placeholder="customer name"
                inputStyle={{ width: "37vw" }}
                field="name"
                value={customer}
                suggestions={customers}
                completeMethod={() => dispatch(listCustomers())}
                onChange={(e) => setCustomer(e.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Quatity <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                value={quantity}
                className="input-box w-full"
                placeholder="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Price <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                value={price}
                className="input-box w-full"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                IsPaid <span className="text-primary">*</span>
              </label>
              <Checkbox
                onChange={(e) => setIsPaid(e.checked)}
                checked={isPaid}
              ></Checkbox>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="py-2 px-10 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default SalesScreen;
