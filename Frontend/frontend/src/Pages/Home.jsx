import React from "react";
import { useGetAllBlogsQuery } from "../Features/Auth/Blog/blogApi";

const Home = () => {
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
    <div className="grid grid-cols-3 p-5">
      {data &&
        data.map((post) => {
          return (
            <div key={post._id}>
              <img src={post.image} alt="img" />
              <div className="grid grid-cols-2">
                <h1>{post.title}</h1>
                <p>{post.detail}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
