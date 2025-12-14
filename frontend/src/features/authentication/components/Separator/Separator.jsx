import classes from "./Separator.module.scss";

export function Separator({ children }) {
  return <div className={classes.root}>{children}</div>;
}
