import classes from "./Box.module.scss";

export function Box({ children }) {
  return <div className={classes.root}>{children}</div>;
}
