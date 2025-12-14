import classes from "./Button.module.scss";

export function Button({
  outline,
  size = "large",
  className = "",
  children,
  ...others
}) {
  return (
    <button
      {...others}
      className={`${classes.root} ${
        outline ? classes.outline : ""
      } ${classes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
