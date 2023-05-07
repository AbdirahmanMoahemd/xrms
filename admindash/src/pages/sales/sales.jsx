import React from "react";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const SalesScreen = () => {
  const { currentColor } = useStateContext();
  const onClickFn = () => {};
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Page"
        title="Sales"
        btnText="Add New"
        currentColor={currentColor}
        onClick={onClickFn}
      />
    </div>
  );
};

export default SalesScreen;
