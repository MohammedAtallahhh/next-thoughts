import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";

import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
import { client } from "../utils/client";
import { topics } from "../utils/constants";

// icons
import ImageUploader from "../components/ImageUploader";
import PostForm from "../components/PostForm";

const uploadClasses = {
  uploadSectionInner:
    " flex flex-col justify-center items-center md:flex-row md:justify-between gap-12 pt-6 rounded-lg w-[80%] max-w-[700px] mx-auto bg-white",
};

const Upload = () => {
  const [caption, setCaption] = useState("");
  const [topic, setTopic] = useState<String>(topics[0].name);
  const [loading, setLoading] = useState<Boolean>(false);
  const [savingPost, setSavingPost] = useState<Boolean>(false);
  const [postImage, setPostImage] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);

  const userProfile: any = useAuthStore((state) => state.userProfile);
  const router = useRouter();

  useEffect(() => {
    if (!userProfile) router.push("/");
  }, [userProfile, router]);

  const uploadPost = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["image/jpeg", "image/png", "image/gif"];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);

      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setPostImage(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && postImage?._id && topic) {
      setSavingPost(true);

      const doc = {
        _type: "post",
        caption,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: postImage?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic,
      };

      await axios.post(`${BASE_URL}/api/post`, doc);

      router.push("/");
    } else {
      //**** TODO: Implement form validation *********//
      console.log("Some IFON is missing!");
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setPostImage(undefined);
    setCaption("");
    setTopic(topics[0].name);
  };

  const { uploadSectionInner } = uploadClasses;
  return (
    <section>
      <div className={uploadSectionInner}>
        <ImageUploader
          {...{ loading, postImage, setPostImage, wrongFileType, uploadPost }}
        />

        {/* Post Form */}
        <PostForm
          {...{
            setTopic,
            caption,
            setCaption,
            postImage,
            handlePost,
            handleDiscard,
            savingPost,
          }}
        />
      </div>
    </section>
  );
};

export default Upload;
