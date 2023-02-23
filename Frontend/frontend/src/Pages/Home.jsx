import React from "react";
import { useGetAllBlogsQuery } from "../Features/Auth/Blog/blogApi";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.user);
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
    <div className="grid grid-cols-3 p-5 ">
      {data &&
        data.map((post) => {
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
            </div>
          );
        })}
    </div>
  );
};

export default Home;
