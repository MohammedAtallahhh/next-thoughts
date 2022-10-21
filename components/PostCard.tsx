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
  header: "flex gap-3 p-2 mb-4 rounded cursor-pointer",
  headerImg: "w-10 h-10 rounded md:w-16 md:h-16",
  name: "flex items-center gap-2 font-bold text-primary md:text-md",
  username: "font-medium text-xs text-gray-500 capitalize md:",
  postImg:
    "rounded-xl bg-gray-100 p-3 border-2 border-gray-200 relative max-w-[700px] h-[400px] lg:h-[500px] xl:h-[550px]",
};

const builder = ImageUrlBuilder(client);

const PostCard = ({ data }: PostCardProps) => {
  const { caption, image, postedBy } = data;
  const { post, header, headerImg, name, username, postImg } = postCardClasses;
  return (
    <div className={post}>
      {/* post header  */}
      <div className={header}>
        {/* image */}
        <div className={headerImg}>
          <Link href="/">
            <Image
              src={postedBy.image}
              alt="Profile picture"
              width={62}
              height={62}
              className="rounded-full"
            />
          </Link>
        </div>

        {/* info */}
        <div>
          <Link href="/">
            <div className="flex flex-wrap items-center gap-2">
              {/* Name */}
              <p className={name}>
                {postedBy.userName}
                <GoVerified className="text-blue-400 text-md" />
              </p>

              {/* username */}
              <p className={username}>@{postedBy.userName}</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="postImg">
        <div className={postImg}>
          <Link href="/">
            <Image
              alt={caption}
              src={builder.image(image).url()}
              // width={200}
              // height={200}
              layout="fill"
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
