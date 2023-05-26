import Message from "../../Molecules/Message/Message";
import styles from "./Timeline.module.css";

const Timeline = ({ posts, filterUser }) => {
  const processedPosts = filterUser
    ? posts.filter((post) => post.user_id === filterUser)
    : posts;

  return (
    <section className={styles.timeline}>
      <h2>Timeline</h2>

      {processedPosts.length > 0 ? (
        <ul>
          {processedPosts.map((post) => (
            <li key={post.id}>
              <Message
                userName={post.name}
                text={post.message}
                datePosted={post.date_posted}
                isUser={post.is_from_user ? false : true}
              />
            </li>
          ))}
      </ul>
        ):
        <p>Oops looks like they are no post, nothing to see here</p>
        }
        
    </section>
  );
};

export default Timeline;
