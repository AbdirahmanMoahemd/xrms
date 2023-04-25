import React, { useEffect } from "react";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { deleteUser, listUsers } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { MdChangeCircle } from "react-icons/md";
import { Button } from "primereact/button";
import { confirmAlert } from "react-confirm-alert";

const Users = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    confirmAlert({
      title: "Permanent Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteUser(id)),
        },
      ],
    });
   
  };

  const onClickFn = () => {
    navigate('/register')
  };
  const { currentColor } = useStateContext();
 
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Users"  
        currentColor={currentColor}
        btnText='Add User'
        onClick={onClickFn}
      />
      <div className="table-responsive " style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <td>NAME</td>
              <td>EMAIL</td>
              <td>Phone</td>
              <td>ROLE</td>
              <td></td>
            </tr>
          </thead>
          {loading ? (
        <center>
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </center>
      ) : error ? (
        <Message severity="error" text={error} />
      ) : (
          <tbody>
            {users.map((user) => (
                <tr key={user._id}>
             <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              
              <td>
              {user.role === 1 ? (
                        <p className="text-white bg-blue-600 text-center px-1">User</p>
                      ) : user.role  === 2 ? (
                        <p className="text-whit bg-yellow-300 text-center px-1">Admin</p>
                      ) : 
                        <p className="text-white bg-green-500 text-center px-1">Super Admin</p>
                  }
              </td>
              <td>
              <td>
                <Button label="" icon="pi pi-delete-left" onClick={()=> deleteHandler(user._id)} />
              </td>
              </td>
            </tr>
            ))}
          </tbody>
      )}
        </table>
      </div>
    </div>
  );
};

export default Users;
