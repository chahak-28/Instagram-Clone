import classes from "./Input.module.scss";

export function Input({ label, size, width, ...others }) {
  return (
    <div className={`${classes.root} ${classes[size || "large"]}`}>
      {label && <label>{label}</label>}
      <input
        {...others}
        style={{
          width: width ? `${width}px` : "100%",
        }}
      />
    </div>
  );
}
