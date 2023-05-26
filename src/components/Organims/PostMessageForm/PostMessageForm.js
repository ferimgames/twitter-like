import styles from "./PostMessageForm.module.css";
import TextArea from "../../Atoms/TextArea/TextArea";
import { useState } from "react";
import Button from "../../Atoms/Button/Button";
import { Form, useSubmit } from "react-router-dom";
const formValidator = (content) => {
  if (content.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};
const PostMessageForm = () => {
  const [content, setConent] = useState("");
  const [error, setError] = useState(false);

  const submit = useSubmit();
  const sumittedPost = (event) => {
    event.preventDefault();

    if (formValidator(content) === false) {
      setError(true);
      return;
    }
    setConent('');
    submit({ content }, { action: "/postMessage", method: "post" });
  };

  const postOnChange = (event) => {
    setConent(event.target.value);
  };

  const postOnBlur = (event) => {
    
    if (formValidator(content) === false) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Form onSubmit={sumittedPost} className={styles.form}>
      <TextArea
        label="Post your ideas!"
        input={{
          id: "conent",
          name: "conent",
          onChange: postOnChange,
          onBlur: postOnBlur,
          value: content,
        }}
      />
      {error && <p>Please at least enter one character.</p>}
      <Button disabled={!error} type="submit">
        Post
      </Button>
    </Form>
  );
};
export default PostMessageForm;
