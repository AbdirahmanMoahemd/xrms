import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { useNavigate } from "react-router-dom";
import { createNewStoreItem } from "../../actions/storeActions";

const AddStoreItem = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [selling, setSelling] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createStoreItem = useSelector((state) => state.createStoreItem);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createStoreItem;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (successCreate) {
      navigate("/store");
    }
  }, [navigate, successCreate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPACTH REGISTER
    dispatch(createNewStoreItem(name, selling, cost, countInStock));
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="Store Item" />
      <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
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
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 mb-2 block">
                Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={name}
                className="input-box w-full"
                placeholder="Item name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Cost Price <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                value={cost}
                className="input-box w-full"
                placeholder="phone number"
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Selling Price <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={selling}
                className="input-box w-full"
                placeholder="Selling Price"
                onChange={(e) => setSelling(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                CountInStock <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="input-box w-full"
                placeholder="countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
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
      </div>
      {/* <!-- checkout form end --> */}
    </div>
  );
};

export default AddStoreItem;
