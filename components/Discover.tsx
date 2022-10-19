import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { topics } from "../utils/constants";

const discoverClasses = {
  discover: "lg:border-b-2 lg:border-gray-200 pb-6",

  topicsTitle: "text-gray-500 font-semibold m-3 m-4 hidden lg:block",

  topicsList: "flex flex-wrap justify-center gap-3",

  topic:
    "px-3 py-2 rounded flex justify-center items-center gap-2 text-black cursor-pointer lg:border-2 lg:border-gray-300 lg:rounded-full hover:bg-primary",

  activeTopic:
    "px-3 py-2 rounded flex justify-center items-center gap-2 text-[#FF1997] cursor-pointer lg:border-2 lg:border-[#F51997] lg:rounded-full hover:bg-primary",

  topicIcon: "font-bold text-2xl lg:text-md",
  topicName: "font-medium text-md capitalize hidden lg:block",
};

const Discover = () => {
  const router = useRouter();
  const { topic: topicQuery } = router.query;

  const {
    discover,
    topicsTitle,
    topicsList,
    topic,
    activeTopic,
    topicIcon,
    topicName,
  } = discoverClasses;

  return (
    <div className={discover}>
      <p className={topicsTitle}>Popular Topics</p>

      <div className={topicsList}>
        {topics.map(({ icon, name }) => (
          <Link key={name} href={`/?topic=${name}`}>
            <div className={topicQuery === name ? activeTopic : topic}>
              <span className={topicIcon}>{icon}</span>
              <span className={topicName}>{name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
