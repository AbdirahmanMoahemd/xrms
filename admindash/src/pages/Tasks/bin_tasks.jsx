import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTasks, listTasksInBin, updateTasksToUnBin } from "../../actions/tasksActions";
import { useNavigate } from "react-router-dom";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Header } from "../../components";
import { Button } from "primereact/button";
import { confirmAlert } from "react-confirm-alert";

const BinTasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasksListInBin = useSelector((state) => state.tasksListInBin);
  const { loading, error, tasks } = tasksListInBin;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;


  const tasksUnBin = useSelector((state) => state.tasksUnBin);
  const {
    loading: loadingUnBin,
    error: errorUnBin,
    success: successUnBin,
  } = tasksUnBin;
  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listTasksInBin());
    }
  }, [dispatch, navigate, userInfo, successDelete, successUnBin]);

  const UnBinTask = (id) => {
    confirmAlert({
      title: "Restore",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(updateTasksToUnBin(id)),
        },
      ],
    });
  };


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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Recycle Bin" />
      <div className="table-responsive" style={{ overflowX: "auto" }}>
      {loadingUnBin && (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
        {errorUnBin && <Message severity="error" text={errorUnBin} />}
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
                      <Button label="" icon="pi pi-sync" onClick={()=> UnBinTask(tasks._id)}/>
                    </td>
                    <td>
                      <Button
                        className="text-red-700"
                        label=""
                        icon="pi pi-delete-left"
                        onClick={() => deleteTask(tasks._id)}
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

export default BinTasks;
