import styles from "./FollowerListElement.module.css";
import Button from "../../Atoms/Button/Button";
import { Form } from "react-router-dom";

const FollowerListElement = ({
  userName,
  isFollow,
  userID,
  filterPostsByUser,
  isFiltering
}) => {
  const onClickFilterHanlder = () => {
    filterPostsByUser(userID);
  };

  const isFiltertingStyle = (isFiltering) ? styles.isFiltering : "";

  return (
    <li className={styles.followListElement}>
      {isFollow && <Button onClick={onClickFilterHanlder} className={`${styles.name} ${isFiltertingStyle}`}>{userName}</Button>}
      {!isFollow && <div className={styles.name}>  {userName}</div> }

      <Form
        action={isFollow ? "/removeFollower" : "/addFollower"}
        method="POST"
      >
        <input type="hidden" value={userID} name="userID" id="userID" />
        <Button type="submit">{isFollow ? "UnFollow" : "Follow"}</Button>
      </Form>
    </li>
  );
};

export default FollowerListElement;
