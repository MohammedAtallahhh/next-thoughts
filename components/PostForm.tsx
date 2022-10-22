import React, { useState } from "react";
import { topics } from "../utils/constants";

const PostFormClasses = {
  container: "flex flex-col gap-3 pb-10 w-full",

  input: "rounded outline-none text-md border-2 border-gray-200 p-2",
  select:
    "outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer",

  option:
    "outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300",
  discardBtn:
    "border-gray-300 border-2 py-3 px-8 text-md font-medium p-2 rounded outline-none",

  postBtn:
    "bg-[#F51997] text-white text-md font-medium py-3 px-8 rounded outline-none cursor-pointer",
};

const PostForm = ({
  caption,
  setCaption,
  setTopic,
  postImage,
  handlePost,
  handleDiscard,
  savingPost,
}: any) => {
  const { container, input, select, option, discardBtn, postBtn } =
    PostFormClasses;
  return (
    <div className={container}>
      <label className="text-md font-medium">Caption</label>
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className={input}
      />
      <label className="text-md font-medium ">Choose a topic</label>

      <select
        onChange={(e) => {
          setTopic(e.target.value);
        }}
        className={select}
      >
        {topics.map((item) => (
          <option key={item.name} className={option} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="flex gap-6 mt-10">
        <button onClick={handleDiscard} type="button" className={discardBtn}>
          Discard
        </button>
        <button
          disabled={postImage?.url ? false : true}
          onClick={handlePost}
          type="button"
          className={postBtn}
        >
          {savingPost ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostForm;
