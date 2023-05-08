import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Dialog } from "primereact/dialog";
import { createNewCustomer, listCustomers } from "../../actions/cusomerActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  CUSTOMER_CREATE_RESET,
  CUSTOMER_LIST_RESET,
} from "../../constants/customersConstants";
import { Button } from "primereact/button";

const Customers = () => {
  const [create, setCreate] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createCustomer = useSelector((state) => state.createCustomer);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createCustomer;

  const customersList = useSelector((state) => state.customersList);
  const { loading, error, customers } = customersList;

  useEffect(() => {
    dispatch({ type: CUSTOMER_LIST_RESET });
    dispatch({ type: CUSTOMER_CREATE_RESET });
    if (!userInfo) {
      navigate("/login");
    }
    if (successCreate) {
      setCreate(false);
      setName("");
      setPhone("");
    }
    dispatch(listCustomers())
  }, [dispatch,userInfo,navigate, successCreate]);

  const onClickFn = () => {
    setCreate(true);
  };
  const { currentColor } = useStateContext();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewCustomer(name, phone));
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title={`Customers (${loading ? '0':customers.length+1})`}
        btnText="Add New"
        currentColor={currentColor}
        onClick={onClickFn}
      />
      <div className="table-responsive " style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Tickets</td>
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
            <tbody>
              {customers.map((cust) => (
                <tr id={cust._id}>
                  <td>XRC-{cust.custID}</td>
                  <td>{cust.name}</td>
                  <td>{cust.phone}</td>
                  <td> <Button
                          label="Show"
                          icon=""
                          onClick={() => {
                            
                          }}
                        /></td>
                    <td><Button
                          label=""
                          icon="pi pi-file-edit"
                          onClick={() => {
                          }}
                        /></td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* create ticket */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="Add New Customer"
        visible={create}
        onHide={() =>{ 
          setCreate(false)
          setName('')
          setPhone('')
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
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={name}
                className="input-box w-full"
                placeholder="customer name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Phone Number <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                value={phone}
                className="input-box w-full"
                placeholder="phone number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
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

export default Customers;
