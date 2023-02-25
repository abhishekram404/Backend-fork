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
        <div className=" grid grid-cols-2 p-3 border-4 dark:border-sky-500 min-h-screen relative ">
          <div>
            <img
              src={state.image}
              alt="Image"
              className="h-[450px] w-[49%] mr-[700px]"
            />
          </div>
          <div className="mt-[100px] ml-[500px] absolute">
            <h1 className="text-2xl font-semibold dark:text-white ">
              {state?.title}
            </h1>
            <p className="dark:text-white mt-[50px]">{state.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
