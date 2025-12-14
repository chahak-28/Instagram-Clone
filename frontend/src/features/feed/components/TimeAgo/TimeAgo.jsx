import { useEffect, useState } from "react";
import { timeAgo } from "../../utils/date";
import classes from "./TimeAgo.module.scss";

export function TimeAgo({ date, edited }) {
  const [time, setTime] = useState(timeAgo(new Date(date)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeAgo(new Date(date)));
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className={classes.root}>
      <span>{time}</span>
      {edited ? <span> . Edited</span> : null}
    </div>
  );
}
