import React from "react";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const Customers = () => {
    const onClickFn = () => {
      }; 
      const { currentColor } = useStateContext();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Customers"
        btnText="Add New"
        currentColor={currentColor}
        onClick={onClickFn}
      />
      <div className="table-responsive " style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Tickets</td>
              <td></td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Customers;
