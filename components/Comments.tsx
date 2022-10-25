import React, { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
// import NoResults from "./NoResults";
import { IUser } from "../types";
import NoComments from "./NoComments";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { allUsers, userProfile, fetchAllUsers }: any = useAuthStore();
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="border-t-2 border-gray-200 mt-4 bg-[#F8F8F8] p-6">
      <div className="overflow-scroll lg:h-[457px]">
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=" p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12">
                            <Image
                              width={48}
                              height={48}
                              className="rounded-full cursor-pointer"
                              src={user.image}
                              alt="user-profile"
                              layout="responsive"
                            />
                          </div>

                          <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                            {user.userName}{" "}
                            <GoVerified className="text-blue-400" />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className="-mt-5 ml-16 text-[16px] mr-8">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoComments text="No Comments Yet! Be the first to add one." />
        )}
      </div>
      {userProfile && (
        <div>
          <form onSubmit={addComment} className="flex gap-4 justify-between">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-300 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              placeholder="Add comment.."
            />
            <button
              className="bg-[#F51997] text-white text-md font-medium py-3 px-8 rounded outline-none cursor-pointer"
              onClick={addComment}
            >
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
