import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { VscServerProcess } from "react-icons/vsc";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTasks,
  listTasks,
  updateTasksStage,
  updateTasksToBin,
} from "../actions/tasksActions";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  BIN_TASKS_RESET,
  GET_TASKS_RESET,
  TASK_CREATE_RESET,
  UPDATE_TASKS_STAGE_RESET,
} from "../constants/tasksConstants";
import { confirmAlert } from "react-confirm-alert";
import { RadioButton } from "primereact/radiobutton";
import { BiErrorAlt } from "react-icons/bi";

const Ecommerce = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0);
  const [stage, setStage] = useState(0);
  const [message, setMessage] = useState(false);

  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.tasksList);
  const { loading, error, tasks } = tasksList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tasksUpdateStage = useSelector((state) => state.tasksUpdateStage);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tasksUpdateStage;

  const createTask = useSelector((state) => state.createTask);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createTask;

  const tasksBin = useSelector((state) => state.tasksBin);
  const {
    loading: loadingBinUpdate,
    error: errorBinUpdate,
    success: successBinUpdate,
  } = tasksBin;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;

  const { currentColor } = useStateContext();

  const onClickFn = () => {
    navigate("/add-tasks");
  };

  let process = 0;
  let Finished = 0;
  let UnFinished = 0;
  let Delivered = 0;

  useEffect(() => {
    dispatch({ type: TASK_CREATE_RESET });
    dispatch({ type: GET_TASKS_RESET });

    
    dispatch({ type: BIN_TASKS_RESET });

    if (!userInfo) {
      navigate("/login");
    }
    if (successUpdate) {
      dispatch({ type: UPDATE_TASKS_STAGE_RESET });
      navigate("/");
    } else {
      dispatch(listTasks());
    }
  }, [
    dispatch,
    navigate,
    successUpdate,
    userInfo,
    keyword,
    successDelete,
    successBinUpdate,
    successCreate
  ]);

  const editconfirm = (id) => {
    setId(id);
    confirmAlert({
      title: "Quick Edit or Full Edit",
      message: "",
      buttons: [
        {
          label: "Quick Edit",
          onClick: () => setVisible(true),
        },
        {
          label: "Edit",
          onClick: () => navigate(`/update-tasks/${id}`),
        },
      ],
    });
  };

  const updateTaskStage = (stage) => {
    if (stage !== "") {
      dispatch(updateTasksStage(id, stage));
      setVisible(false);
      console.log(id);
    }
  };

  console.log(id);

  if (tasks) {
    for (let index = 0; index < tasks.length; index++) {
      if (tasks[index].stage === 0) {
        process++;
      } else if (tasks[index].stage === 1) {
        Finished++;
      } else if (tasks[index].stage === 2) {
        Delivered++;
      } else if (tasks[index].stage === 3) {
        UnFinished++;
      }
    }
  }

  const deleteTask = (id) => {
    confirmAlert({
      title: "Permanent Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteTasks(id)),
        },
      ],
    });
  };

  const binTask = (id) => {
    confirmAlert({
      title: "Move To Bin",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(updateTasksToBin(id)),
        },
      ],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listTasks(keyword));
  };

  return (
    <div className="mt-14">
      <div className="flex flex-wrap lg:flex-nowrap justify-between m-10">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full  p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">on Process Tasks</p>
              <p className="text-2xl">{process}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <MdPendingActions />
            </button>
          </div>
        </div>
        <div className="lg:flex w-full">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl   p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">Finished Tasks</p>
                <p className="text-xl">{Finished}</p>
              </div>
              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-2"
              >
                <VscServerProcess />
              </button>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl   p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">UnFinished Tasks</p>
                <p className="text-xl">{UnFinished}</p>
              </div>
              <button
                type="button"
                style={{ backgroundColor: "red" }}
                className="text-xl opacity-0.9  text-red-600 hover:drop-shadow-xl rounded-full  p-2"
              >
                <BiErrorAlt className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full  p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Delivered Tasks</p>
              <p className="text-2xl">{Delivered}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <AiOutlineFileDone />
            </button>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-xl w-full  p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
        </div>
      </div>
      <div className="md:m-10 mt-24 p-4 md:p-10 bg-white rounded-3xl m-2">
        <Header
          category=""
          title="Recent Tasks"
          btnText="Add Ticket"
          currentColor={currentColor}
          onClick={onClickFn}
        />
        <div className="table-responsive " style={{ overflowX: "auto" }}>
          <center>
            {" "}
            <form
              className="w-full xl:max-w-xl max-w-lg flex relative"
              onSubmit={submitHandler}
            >
              <input
                type="text"
                className="input-box w-full"
                placeholder="search by name"
                style={{ borderColor: currentColor }}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                style={{ backgroundColor: currentColor }}
                className="border text-white px-8 font-medium rounded-r-md hover:bg-transparent  transition"
              >
                Search
              </button>
            </form>
          </center>
          <br />
          {loadingBinUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorBinUpdate && <Message severity="error" text={errorBinUpdate} />}
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
                <td>Phone</td>
                <td>Item</td>
                <td>Problem Type</td>
                <td>Date</td>
                <td>Amount</td>
                <td></td>
                <td>Status</td>
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
                  {tasks.map((tasks) => (
                    <tr id={tasks._id}>
                      <td>{tasks.name}</td>
                      <td>{tasks.phone}</td>
                      <td>{tasks.item}</td>
                      <td>{tasks.problem}</td>
                      <td>{tasks.date.substring(0, 10)}</td>
                      <td>${tasks.amount}</td>
                      <td>
                        <Button
                          label=""
                          icon="pi pi-comment"
                          onClick={() => setMessage(true)}
                        />
                        <Dialog
                          header="Comment"
                          visible={message}
                          onHide={() => setMessage(false)}
                          style={{ width: "50vw" }}
                          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                        >
                          <p className="m-0">{tasks.comment}</p>
                        </Dialog>
                      </td>
                      <td>
                        {tasks.stage === 0 ? (
                          <p className="text-white bg-blue-600 text-center px-1">
                            On Process
                          </p>
                        ) : tasks.stage === 1 ? (
                          <p className="text-whit bg-yellow-300 text-center px-1">
                            Finished
                          </p>
                        ) : tasks.stage === 2 ? (
                          <p className="text-white bg-green-500 text-center px-1">
                            Delivered
                          </p>
                        ) : (
                          <p className="text-white bg-red-600 text-center  px-1">
                            Unfinished
                          </p>
                        )}
                      </td>
                      <td>
                        <Button
                          label=""
                          icon="pi pi-file-edit"
                          onClick={() =>{
                            editconfirm(tasks._id)
                            setStage(tasks.stage)
                           }}
                        />
                        <Dialog
                          header="Quick Edit"
                          visible={visible}
                          onHide={() => setVisible(false)}
                          style={{ width: "50vw" }}
                          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                        >
                          {loadingUpdate && (
                            <ProgressSpinner
                              style={{ width: "20px", height: "20px" }}
                              strokeWidth="6"
                              fill="var(--surface-ground)"
                              animationDuration=".5s"
                            />
                          )}
                          {errorUpdate && (
                            <Message severity="error" text={errorUpdate} />
                          )}

                          <label className="text-gray-600 mb-2 block">
                            Task Stage
                          </label>
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
                            <Button
                              label="Update"
                              icon=""
                              onClick={() => updateTaskStage(stage)}
                            />
                          </div>
                        </Dialog>
                      </td>
                      <td>
                        {userInfo.role === 1 ? (
                          <Button
                            label=""
                            icon="pi pi-delete-left"
                            onClick={() => binTask(tasks._id)}
                          />
                        ) : (
                          <Button
                            label=""
                            icon="pi pi-delete-left"
                            onClick={() => deleteTask(tasks._id)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
