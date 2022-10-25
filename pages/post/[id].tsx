import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import ImageUrlBuilder from "@sanity/image-url";
import axios from "axios";

// icons
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

// components
// import Comments from "../../components/Comments";
// import LikeButton from "../../components/LikeButton";

// variables
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";
import { Post } from "../../types";
import { client } from "../../utils/client";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  data: Post;
}

const postClasses = {
  postClass:
    "flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap",

  postMedia:
    "relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center",

  closeBtn: "opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50",

  details: "relative px-10",
  detailsHeader: "flex gap-4 mb-4 bg-white w-full cursor-pointer",
};

const PostPage = ({ data }: IProps) => {
  const [post, setPost] = useState(data);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment: comment.trim(),
        });

        setPost({ ...post, comments: res.data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };

  const { caption, image, postedBy, comments } = post;

  const { postClass, postMedia, closeBtn, details, detailsHeader } =
    postClasses;

  return (
    <>
      {post && (
        <div className={postClass}>
          <div className={postMedia}>
            {/* close button */}
            <div className={closeBtn}>
              <p className="cursor-pointer " onClick={() => router.back()}>
                <MdOutlineCancel className="text-red-500 text-[50px] hover:opacity-80 transition-all" />
              </p>
            </div>

            {/* post image */}
            <div className="relative w-full h-[50vh] lg:h-[100vh] bg-gray-200">
              <div className="relative w-full h-full p-10">
                <Image
                  src={ImageUrlBuilder(client).image(image).url()}
                  alt={caption}
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            </div>
          </div>

          {/* post details */}
          <section className={details}>
            <div className="mt-10">
              {/* post details header */}
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className={detailsHeader}>
                  <Image
                    width={60}
                    height={60}
                    alt="user-profile"
                    className="rounded-full"
                    src={postedBy.image}
                  />

                  {/* name and username */}
                  <div>
                    <div className="text-xl font-bold tracking-wider flex gap-2 items-center justify-center">
                      {postedBy.userName}
                      <GoVerified className="text-blue-400 text-xl" />
                    </div>
                    <p className="text-md">
                      @{postedBy.userName.replace(" ", "")}
                    </p>
                  </div>
                </div>
              </Link>

              {/* caption */}
              <div className="pl-10">
                <p className="text-lg text-gray-800">{caption}</p>
              </div>
              <div className="mt-10 px-10">
                {userProfile && (
                  <LikeButton
                    likes={post.likes}
                    flex="flex"
                    handleLike={() => handleLike(true)}
                    handleDislike={() => handleLike(false)}
                  />
                )}
              </div>
              <Comments
                comment={comment}
                setComment={setComment}
                addComment={addComment}
                comments={comments}
                isPostingComment={isPostingComment}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  console.log(id);

  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { data: res.data },
  };
};

export default PostPage;
