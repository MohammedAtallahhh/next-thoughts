import axios from "axios";

import { Post } from "../types";

import PostCard from "../components/PostCard";
import { BASE_URL } from "../utils";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

type HomeProps = {
  posts: Post[];
};

const HomeClasses = {
  postsClass: "posts flex flex-col gap-10 h-full",
};

const Home = ({ posts }: HomeProps) => {
  // const { fetchAllUsers } = useAuthStore();
  // useEffect(() => {
  //   fetchAllUsers();
  // }, []);

  const { postsClass } = HomeClasses;
  return (
    <div className="pr-6">
      <div className={postsClass}>
        {posts.length ? (
          posts.map((post) => <PostCard key={post._id} data={post} />)
        ) : (
          <h1>No Posts!</h1>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await axios.get(`${BASE_URL}/api/post`);

  return { props: { posts: response.data } };
};

export default Home;
