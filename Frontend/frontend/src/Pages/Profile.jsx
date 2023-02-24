import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useGetBlogByUserQuery,
  useRemoveBlogsMutation,
} from "../Features/Auth/Blog/blogApi";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  const nav = useNavigate();
  const token = user?.token || "";

  const { isError, isLoading, error, data } = useGetBlogByUserQuery(token);
  const [removePost, { Loading, iserror }] = useRemoveBlogsMutation();
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
  const remove = async (post_id, public_id) => {
    try {
      const response = await removePost({ post_id, public_id }).unwrap();
      toast.success("successfully remove");
    } catch (err) {
      toast.error(err.message);
    }
  };

  console.log(data);
  return (
    <div>
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
                <div className="mt-2 space-y-2 dark:text-white">
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
                    <i className="fa-solid fa-pen-to-square fa-xl dark:text-white dark:hover:text-blue-500"></i>
                  </button>
                  <button onClick={() => remove(post._id, post.public_id)}>
                    {" "}
                    <i className="fa-solid fa-trash fa-xl dark:text-red-600 hover:dark:text-red-600"></i>
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
