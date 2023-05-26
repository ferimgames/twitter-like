import styles from "./Input.module.css";
import React from "react";

const Input = (props) => {
  return (
    <div className={`${styles.input} ${props.className}`}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input id={props.input.id} {...props.input} />
    </div>
  );
};

Input.defaultProps = {
  className: "",
  label: "",
}; 
export default Input;
