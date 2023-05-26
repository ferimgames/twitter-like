import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`button ${props.className}`}
      {...props.button}
    >
      {props.children}
    </button>
  );
};
Button.defaultProps = {
  onClick: () => {},
  type: "button",
  children: "Submit",
  className: styles.primary,
};
export default Button;
