import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { useNavigate } from "react-router-dom";
import { createNewIncome } from "../../actions/incomeActions";
import DatePicker from "react-date-picker";

const AddIncome = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  const [ref, setRef] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createIncomeItem = useSelector((state) => state.createIncomeItem);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createIncomeItem;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (successCreate) {
      navigate("/income");
    }
  }, [navigate, successCreate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPACTH REGISTER
    dispatch(createNewIncome(title, amount, type, date, ref));
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="New Income" />
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
                Title <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={title}
                className="input-box w-full"
                placeholder="Item name"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Amount <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={amount}
                className="input-box w-full"
                placeholder="amount"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Type <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={type}
                className="input-box w-full"
                placeholder="type"
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Date <span className="text-primary">*</span>
              </label>
              <DatePicker onChange={setDate} value={date} />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">Reference.</label>
              <textarea
                type="text"
                className="input-box w-full"
                placeholder="reference"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                cols="40"
                rows="5"
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

export default AddIncome;
