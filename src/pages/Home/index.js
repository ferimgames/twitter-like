import { useState } from "react";
import styles from "./home.module.css";
import PostMessageForm from "../../components/Organims/PostMessageForm/PostMessageForm";
import Timeline from "../../components/Organims/Timeline/Timeline";
import FollowList from "../../components/Organims/FollowersList/FollowList";
import { useRouteLoaderData } from "react-router-dom";
import { getAllPosts, getFollowerslists } from "../../util/twitter-db-handler";

const HomePage = () => {
  //State inicialization

  const [filterByUser, setFilterByUser] = useState(null);

  const userID = useRouteLoaderData("root");
  const posts = getAllPosts({ userID });
  const { following, notFollowing } = getFollowerslists({ userID });

  //Filterting post list by the filterByUser State when is set
  const filterPostByUserHanlder = (filterUserID) => {
    if (filterUserID === filterByUser) {
      setFilterByUser(null);
    } else {
      setFilterByUser(filterUserID);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__left}>
        <FollowList
          userList={following}
          isFollowing={true}
          label="Following"
          onClickFilter={filterPostByUserHanlder}
        />
        <FollowList
          userList={notFollowing}
          isFollowing={false}
          label="Click here to subscrisbe"
        />
      </div>
      <div className={styles.container__right}>
        <Timeline posts={posts} filterUser={filterByUser} />
        <PostMessageForm />
      </div>
    </div>
  );
};

export default HomePage;
