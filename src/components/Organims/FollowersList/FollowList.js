import Card from "../../Atoms/Card/Card";
import styles from "./FollowList.module.css";
import FollowerListElement from "../../Molecules/FollowerListElement/FollowerListElement";
import { useState } from "react";
const FollowList = ({ userList, label, onClickFilter, isFollowing }) => {
  const [filteredUserId, setFIlteredUserID] = useState(null);

  const onClickFilterByUserHanlder = (id) => {
    if (id === filteredUserId) {
      setFIlteredUserID(null);
    } else {
      setFIlteredUserID(id);
    }

    onClickFilter(id);
  };
  return (
    <section className={styles.followList__holder}>
      <h2 className={styles.label}> {label}</h2>
      {userList.length > 0 ? (
        <Card className={styles.followList__container}>
          <ul className={styles.followList__list}>
            {userList.map((user) => (
              <FollowerListElement
                userName={user.name}
                isFollow={isFollowing}
                key={user.id}
                userID={user.id}
                isFiltering={user.id === filteredUserId ? true : false}
                filterPostsByUser={onClickFilterByUserHanlder}
              />
            ))}
          </ul>
        </Card>
      ) : (
        <p>
          {isFollowing
            ? "Add some people to start seem something on your timeline"
            : "No more people to follow"}
        </p>
      )}
    </section>
  );
};

export default FollowList;
