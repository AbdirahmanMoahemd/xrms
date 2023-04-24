import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTasksInBin } from "../../actions/tasksActions";
import { useNavigate } from "react-router-dom";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from "primereact/button";

const BinTasks = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();

  const tasksListInBin = useSelector((state) => state.tasksListInBin);
  const { loading, error, tasks } = tasksListInBin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listTasksInBin());
    }
  }, [dispatch, navigate, userInfo]);

  const { currentColor } = useStateContext();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Recycle Bin"
      />
      <div className="table-responsive" style={{ overflowX: "auto" }}>
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
                      <Button
                        label=""
                        icon="pi pi-sync"
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
