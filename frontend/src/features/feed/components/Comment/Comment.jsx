import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import classes from "./Comment.module.scss";
import { useState } from "react";
import { Input } from "../../../../components/Input/Input";
import { timeAgo } from "../../utils/date";

export function Comment({ comment, deleteComment, editComment }) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const { user } = useAuthentication();

  return (
    <div key={comment.id} className={classes.root}>
      {!editing ? (
        <>
          <div className={classes.header}>
            <button
              onClick={() => {
                navigate(`/profile/${comment.author.id}`);
              }}
              className={classes.author}
            >
              <img
                className={classes.avatar}
                src={comment.author.profilePicture || "/me.jpeg"}
                alt=""
              />
              <div>
                <div className={classes.name}>
                  {comment.author.firstName + " " + comment.author.lastName}
                </div>
                <div className={classes.title}>
                  {comment.author.position + " at " + comment.author.company}
                </div>
                <div className={classes.date}>
                  {timeAgo(
                    new Date(comment.updatedDate || comment.creationDate)
                  )}
                  {comment.updatedDate ? " . Edited " : ""}
                </div>
              </div>
            </button>

            {comment.author.id == user?.id && (
              <button
                className={`${classes.action} ${
                  showActions ? classes.active : ""
                }`}
                onClick={() => setShowActions(!showActions)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                  <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                </svg>
              </button>
            )}

            {showActions && (
              <div className={classes.actions}>
                <button onClick={() => setEditing(true)}>
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <path
                      d="M823.3 938.8H229.4c-71.6 0-129.8-58.2-129.8-129.8V215.1c0-71.6 58.2-129.8 129.8-129.8h297c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7h-297c-24.5 0-44.4 19.9-44.4 44.4V809c0 24.5 19.9 44.4 44.4 44.4h593.9c24.5 0 44.4-19.9 44.4-44.4V512c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v297c0 71.6-58.2 129.8-129.8 129.8z"
                      fill="#3688FF"
                    />
                    <path
                      d="M483 756.5c-1.8 0-3.5-0.1-5.3-0.3l-134.5-16.8c-19.4-2.4-34.6-17.7-37-37l-16.8-134.5c-1.6-13.1 2.9-26.2 12.2-35.5l374.6-374.6c51.1-51.1 134.2-51.1 185.3 0l26.3 26.3c24.8 24.7 38.4 57.6 38.4 92.7 0 35-13.6 67.9-38.4 92.7L513.2 744c-8.1 8.1-19 12.5-30.2 12.5z"
                      fill="#5F6379"
                    />
                  </svg>
                </button>

                <button onClick={() => deleteComment(comment.id)}>
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <path
                      d="M779.5 1002.7h-535c-64.3 0-116.5-52.3-116.5-116.5V170.7h768v715.5c0 64.2-52.3 116.5-116.5 116.5z"
                      fill="#3688FF"
                    />
                    <path
                      d="M917.3 256H106.7C83.1 256 64 236.9 64 213.3s19.1-42.7 42.7-42.7h810.7c23.6 0 42.7 19.1 42.7 42.7S940.9 256 917.3 256z"
                      fill="#5F6379"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className={classes.content}>{comment.content}</div>
        </>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await editComment(comment.id, commentContent);
            setEditing(false);
            setShowActions(false);
          }}
        >
          <Input
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Edit your comment"
          />
        </form>
      )}
    </div>
  );
}
