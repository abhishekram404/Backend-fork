import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useGetBlogByUserQuery } from "../Features/Auth/Blog/blogApi";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  const nav = useNavigate();

  const { isError, isLoading, error, data } = useGetBlogByUserQuery(user.token);
  if (isLoading) {
    return (
      <div className="h-[600px]">
        <lottie-player
          src="https://assets6.lottiefiles.com/packages/lf20_octtoqca.json"
          background="transparent"
          loop
          autoplay
        ></lottie-player>
      </div>
    );
  }

  console.log(data);
  return (
    <div>
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
      <div className="grid grid-cols-3 p-5">
        {data &&
          data.posts.map((post) => {
            return (
              <div key={post._id}>
                <img
                  src={post.image}
                  alt="img"
                  className="object-cover h-[400px] w-[400px]"
                />
                <div className="mt-2 space-y-2">
                  <h1 className="text-2xl font-bold">{post.title}</h1>
                  <p>{post.detail.substring(0, 200)}</p>
                </div>
                <div className="flex justify-end space-x-9">
                  <button
                    onClick={() => {
                      nav("/update/post", { state: post });
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-pen-to-square fa-xl"></i>
                  </button>
                  <button>
                    {" "}
                    <i className="fa-solid fa-trash fa-xl"></i>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
