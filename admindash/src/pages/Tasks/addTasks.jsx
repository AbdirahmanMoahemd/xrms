import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { useNavigate } from "react-router-dom";
import { createNewTask } from "../../actions/tasksActions";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const AddTasks = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [item, setItem] = useState("");
  const [problem, setProblem] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createTask = useSelector((state) => state.createTask);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createTask;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (successCreate) {
      navigate("/");
    }
  }, [navigate, successCreate, userInfo]);

  let userid = userInfo._id;

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPACTH REGISTER
    dispatch(
      createNewTask(name, phone, item, problem, date, amount, userid, comment)
    );
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Add" title="Task Ticket" />
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
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={name}
                className="input-box w-full"
                placeholder="full name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Phone Number <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={phone}
                className="input-box w-full"
                placeholder="phone number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">
                Item name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={item}
                className="input-box w-full"
                placeholder="item name"
                onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Problem Type <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="input-box w-full"
                placeholder="problem type"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
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
              <label className="text-gray-600 mb-2 block">
                Amount <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                className="input-box w-full"
                placeholder="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-600 mb-2 block">Comment.</label>
              <textarea
                type="text"
                className="input-box w-full"
                placeholder="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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

export default AddTasks;
