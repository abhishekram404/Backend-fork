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
  return <>Hi</>;
};

export default Home;
