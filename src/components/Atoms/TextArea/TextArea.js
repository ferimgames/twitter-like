const TextArea = (props) => {
  return (
    <div className={`${props.className}`}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <textarea id={props.input.id} {...props.input} />
    </div>
  );
};

TextArea.defaultProps = {
    className: "textareaHolder",
    label: "",
  }; 

export default TextArea;
