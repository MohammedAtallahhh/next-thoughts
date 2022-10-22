import React, { Dispatch, SetStateAction } from "react";
import { SanityAssetDocument } from "@sanity/client";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ImageUploaderClasses = {
  uploadImageContainer:
    "h-[400px] max-w-[300px] mx-auto border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 p-10 bg-gray-100 cursor-pointer hover:border-red-300 hover:bg-gray-200",

  uploadLabelInner: "flex flex-col items-center justify-center h-full",

  uploadedImage:
    "relative h-full rounded-3xl p-4 flex flex-col gap-6 justify-center items-center",

  uploadBtn:
    "bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none",

  deleteBtn:
    " rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out",
};

const ImageUploader = ({
  loading,
  postImage,
  uploadPost,
  setPostImage,
  wrongFileType,
}: any) => {
  console.log(postImage);

  const imageName = () => {
    let name = postImage?.originalFilename;

    if (name.length > 15) {
      name = `${name.slice(0, 15)}...${postImage?.extension}`;
    }

    return name;
  };

  const {
    uploadImageContainer,
    uploadLabelInner,
    uploadedImage,
    uploadBtn,
    deleteBtn,
  } = ImageUploaderClasses;

  return (
    <div className="w-full">
      <div>
        <p className="text-2xl font-bold">Upload Post</p>
        <p className="text-md text-gray-400 mt-1">Post to your account</p>
      </div>
      <div className={uploadImageContainer}>
        {loading ? (
          <p className="text-center text-3xl text-red-400 font-semibold">
            Uploading...
          </p>
        ) : (
          <div className="h-full">
            {!postImage ? (
              <label className="cursor-pointer">
                <div className={uploadLabelInner}>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-xl">
                      <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                    </p>
                    <p className="text-xl font-semibold">
                      Select video to upload
                    </p>
                  </div>

                  <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                    MP4 or WebM or ogg <br />
                    720x1280 resolution or higher <br />
                    Up to 10 minutes <br />
                    Less than 2 GB
                  </p>
                  <p className={uploadBtn}>Select file</p>
                </div>
                <input
                  type="file"
                  name="upload-video"
                  onChange={uploadPost}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className={uploadedImage}>
                <div className="relative h-full w-full">
                  <Image
                    src={postImage?.url}
                    alt={""}
                    layout="fill"
                    className="rounded-md"
                    objectFit="contain"
                  />
                </div>

                <div className="flex justify-between gap-10 mt-6">
                  <p className="text-lg">{imageName()}</p>
                  <button
                    type="button"
                    className={deleteBtn}
                    onClick={() => setPostImage(undefined)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {wrongFileType && (
        <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
          Please select an video file (Jpg or png or gif)
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
