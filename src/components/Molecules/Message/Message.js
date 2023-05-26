import { timeSince } from "../../../util/utility";
import Card from "../../Atoms/Card/Card";
import styles from "./Message.module.css";

const Message = ({ userName, text, datePosted, isUser }) => {

  const formatedDatePosted = timeSince(datePosted);
  return (
    <Card>
      <div className={styles.message__userName}>{isUser? userName: "Me"}</div>
      <p className={styles.message__text}>{text}</p>
      <span>{formatedDatePosted}</span>
    </Card>
  );
};
export default Message;
