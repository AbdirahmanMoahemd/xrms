import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_TASKS_RESET } from "../../constants/tasksConstants";
import { listTaskstDetails, updateTasks } from "../../actions/tasksActions";
import DatePicker from "react-date-picker";
import { RadioButton } from "primereact/radiobutton";

const UpdateTask = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [item, setItem] = useState("");
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [stage, setStage] = useState(0);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tasksDetails = useSelector((state) => state.tasksDetails);
  const { loading, error, task } = tasksDetails;

  const tasksUpdate = useSelector((state) => state.tasksUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tasksUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (successUpdate) {
      dispatch({ type: UPDATE_TASKS_RESET });
      navigate("/tasks");
    } else {
      if (!task.name || task._id !== id) {
        dispatch(listTaskstDetails(id));
      } else {
        setName(task.name);
        setPhone(task.phone);
        setItem(task.item);
        setProblem(task.problem);
        setDate(task.date);
        setAmount(task.amount);
        setStage(task.stage);
      }
    }
  }, [dispatch, navigate,userInfo, successUpdate, id, task]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTasks(
        id,
        name,
        phone,
        item,
        problem,
        date,
        amount,
        stage,
      )
    );
  };

  return (
    <div className="container m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
      {/* <!-- checkout form --> */}
      <Header category="Update" title="Task Ticket" />
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
              <label className="text-gray-600 mb-2 block">Task Stage</label>
              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient1"
                    name="pizza"
                    value={0}
                    onChange={(e) => setStage(e.value)}
                    checked={stage === 0}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    On Process
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient2"
                    name="pizza"
                    value={1}
                    onChange={(e) => setStage(e.value)}
                    checked={stage === 1}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Finished
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient3"
                    name="pizza"
                    value={2}
                    onChange={(e) => setStage(e.value)}
                    checked={stage === 2}
                  />
                  <label htmlFor="ingredient3" className="ml-2">
                    Delivired
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient3"
                    name="pizza"
                    value={3}
                    onChange={(e) => setStage(e.value)}
                    checked={stage === 3}
                  />
                  <label htmlFor="ingredient4" className="ml-2">
                    Unfinished
                  </label>
                </div>
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

export default UpdateTask;
