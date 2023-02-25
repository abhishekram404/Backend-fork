import React from "react";
import { useGetAllBlogsQuery } from "../Features/Auth/Blog/blogApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();
  const { isError, isLoading, error, data } = useGetAllBlogsQuery();
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

  return (
    <div className="grid grid-cols-1 p-5 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {data &&
        data.map((post) => {
          return (
            <div
              className="hover:cursor-pointer p-7 border-3"
              onClick={() => nav("postDetail", { state: post })}
              key={post._id}
            >
              <img
                src={post.image}
                alt="img"
                className="object-cover h-[450px] w-full"
              />
              <div className="mt-2 space-y-2">
                <h1 className="text-2xl font-bold dark:text-white">
                  {post.title}
                </h1>
                <p className="dark:text-white">
                  {post.detail.substring(0, 200)}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
