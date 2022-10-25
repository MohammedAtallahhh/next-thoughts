import ImageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "../types";
import { client } from "../utils/client";

// icons
import { GoVerified } from "react-icons/go";

type PostCardProps = {
  data: Post;
};

const postCardClasses = {
  post: "flex flex-col border-b-2 border-gray-200 pb-10",
  header: "flex gap-3 mb-4 rounded",
  headerImg: "relative w-14 h-14 rounded md:w-18 md:h-18 cursor-pointer",
  nameContainer: "flex flex-wrap items-center gap-2 cursor-pointer",
  name: "flex items-center gap-2 font-bold text-primary md:text-md",
  username: "font-medium text-xs text-gray-500 capitalize md:",
  captionClass: "caption font-semibold text-lg ml-4",
  postImg:
    "rounded-xl p-3 bg-gray-50 border-2 border-gray-200 relative max-w-[750px] h-[300px] lg:h-[400px] xl:h-[450px]",
};

const builder = ImageUrlBuilder(client);

const PostCard = ({ data }: PostCardProps) => {
  const { _id, caption, image, postedBy } = data;
  const {
    post,
    header,
    headerImg,
    nameContainer,
    name,
    username,
    captionClass,
    postImg,
  } = postCardClasses;

  return (
    <div className={post}>
      {/* post header  */}
      <header className={header}>
        {/* image */}
        <div className={headerImg}>
          <Link href="/">
            {/* <div className="relative w-16 h-16"> */}
            <Image
              src={postedBy.image}
              alt="Profile picture"
              layout="fill"
              className="rounded-full"
            />
            {/* </div> */}
          </Link>
        </div>
        {/* info */}
        <div className="flex flex-col gap-4">
          <Link href="/">
            <div className={nameContainer}>
              {/* Name */}
              <p className={name}>
                {postedBy.userName}
                <GoVerified className="text-blue-400 text-md" />
              </p>

              {/* username */}
              <p className={username}>@{postedBy.userName}</p>
            </div>
          </Link>

          {/* Caption  */}
          <div className={captionClass}>
            <h2>{caption}</h2>
          </div>
        </div>
      </header>

      <div>
        <div className={postImg}>
          <Link href={`/post/${_id}`}>
            <div className="relative w-full h-full">
              <Image
                alt={caption}
                src={builder.image(image).url()}
                // width={200}
                // height={200}
                layout="fill"
                className="cursor-pointer"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
