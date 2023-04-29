import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { useNavigate, useParams } from "react-router-dom";
import {
  listIncomeItemDetails,
  updateIncomeItem,
} from "../../actions/incomeActions";
import DatePicker from "react-date-picker";
import { INCOME_UPDATE_RESET } from "../../constants/incomeConstants";

const UpdateIncome = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date());
  const [ref, setRef] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const incomeItemUpdate = useSelector((state) => state.incomeItemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = incomeItemUpdate;

  const incomeItemDetails = useSelector((state) => state.incomeItemDetails);
  const { loading, error, item } = incomeItemDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (successUpdate) {
      dispatch({ type: INCOME_UPDATE_RESET });
      navigate("/income");
    } else {
      if (!item.title || item._id !== id) {
        dispatch(listIncomeItemDetails(id));
      } else {
        setTitle(item.title);
        setAmount(item.amount);
        setType(item.type);
        setDate(item.date);
        setRef(item.ref);
      }
    }
  }, [dispatch, navigate, userInfo, successUpdate, id, item]);

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPACTH REGISTER
    dispatch(updateIncomeItem(id, title, amount, type, date, ref));
  };


  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Update" title="Income" />
      <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
        <form onSubmit={submitHandler}>
          {loadingUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorUpdate && <Message severity="error" text={errorUpdate} />}
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
                Update
              </button>
            </div>
          </div>
          )}
        </form>
      </div>
      {/* <!-- checkout form end --> */}
    </div>
  );
};

export default UpdateIncome;
