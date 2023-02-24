import React from "react";
import { useLocation } from "react-router";

const Detail = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      {state == null ? (
        <h1>No data</h1>
      ) : (
        <div className="p-7 border-4 dark:border-sky-500 flex flex-row-reverse relative mr-[100px]">
          <h1 className="text-2xl font-semibold dark:text-white absolute mr-[400px] mt-[150px]">
            {state?.title}
          </h1>
          <p className="dark:text-white absolute mt-[240px] mr-[380px]">
            {state.detail}
          </p>
          <img src={state.image} alt="Image" className="w-[37%] mr-[700px]" />
        </div>
      )}
    </div>
  );
};

export default Detail;
