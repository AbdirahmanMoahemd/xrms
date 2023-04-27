import React, { useEffect, useState } from "react";
import { Header } from "../../components";
import {
  listTasks,
  updateTasksStage,
  updateTasksToBin,
  listTasksInBin,
} from "../../actions/tasksActions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_TASKS_RESET,
  TASK_CREATE_RESET,
  UPDATE_TASKS_STAGE_RESET,
} from "../../constants/tasksConstants";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { useStateContext } from "../../contexts/ContextProvider";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { confirmAlert } from "react-confirm-alert";
import { RadioButton } from "primereact/radiobutton";
import { FaRecycle } from "react-icons/fa";

const Tasks = () => {
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.tasksList);
  const { loading, error, tasks } = tasksList;

  const tasksListInBin = useSelector((state) => state.tasksListInBin);
  const {
    loading: loadingBin,
    error: errorBin,
    tasks: tasksBinlist,
  } = tasksListInBin;

  const [stage, setStage] = useState("");

  const tasksUpdateStage = useSelector((state) => state.tasksUpdateStage);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tasksUpdateStage;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;

  const tasksBin = useSelector((state) => state.tasksBin);
  const {
    loading: loadingBinUpdate,
    error: errorBinUpdate,
    success: successBinUpdate,
  } = tasksBin;

  useEffect(() => {
    dispatch({ type: TASK_CREATE_RESET });
    dispatch({ type: GET_TASKS_RESET });

    if (!userInfo) {
      navigate("/login");
    }
    if (successUpdate) {
      dispatch({ type: UPDATE_TASKS_STAGE_RESET });
      navigate("/tasks");
    } else {
      dispatch(listTasks(keyword));
      dispatch(listTasksInBin());
    }

   
  }, [
    dispatch,
    navigate,
    keyword,
    successUpdate,
    userInfo,
    successDelete,
    successBinUpdate,
  ]);

  const { currentColor } = useStateContext();

  const onClickFn = () => {
    navigate("/add-tasks");
  };
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
    }
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
    e.preventDefault()
    dispatch(listTasks(keyword));
}

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Tasks"
        btnText="Add Ticket"
        currentColor={currentColor}
        onClick={onClickFn}
      />
      <div className="table-responsive" style={{ overflowX: "auto" }}>
        {userInfo.role === 2 ? (
          <div className="lg:flex justify-between w-full pb-5">
            {loadingBin ? (
              <Link>
                <p className="flex items-center">
                  Recycle Bin <span className="px-1"></span>
                  <FaRecycle />
                  (0)
                </p>
              </Link>
            ) : (
              <Link to={"/recycle-bin"}>
                <p className="flex items-center">
                  Recycle Bin <span className="px-1"></span>
                  <FaRecycle />({tasksBinlist.length})
                </p>
              </Link>
            )}
            <span className="px-1"></span>
            <form className="w-full xl:max-w-xl max-w-lg flex relative" onSubmit={submitHandler}>
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
          </div>
        ) : (
          <center>
            {" "}
            <form className="w-full xl:max-w-xl max-w-lg flex relative">
              <input
                type="text"
                className="input-box w-full"
                placeholder="search"
                style={{ borderColor: currentColor }}
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
        )}
        <br />
        {loadingDelete && (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
        {errorDelete && <Message severity="error" text={errorDelete} />}
        {loadingBinUpdate && (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
        {errorBinUpdate && <Message severity="error" text={errorBinUpdate} />}
        {errorBin && <Message severity="error" text={errorBin} />}
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
                        <>
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
                            <button
                              onClick={() => updateTaskStage(stage)}
                              className="py-2 px-10 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                            >
                              Update
                            </button>
                          </div>
                        </>
                      </Dialog>
                    </td>
                    <td>
                      <Button
                        label=""
                        icon="pi pi-delete-left"
                        onClick={() => binTask(tasks._id)}
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
export default Tasks;
