import { useEffect, useState } from "react";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import classes from "./Post.module.scss";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../../components/Input/Input";
import { Comment } from "../Comment/Comment";
import { Madal } from "../Modal/Modal";
import { TimeAgo } from "../TimeAgo/TimeAgo";

export function Post({ post, setPosts }) {
  const { user } = useAuthentication();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [postLiked, setPostLiked] = useState(undefined);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/feed/posts/${post.id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Error loading comments");
      }
    };

    fetchComments();
  }, [post.id]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/feed/posts/${post.id}/likes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }

        const data = await response.json();
        setLikes(data);
        setPostLiked(!!data.some((like) => like.id === user?.id));
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Error loading likes");
      }
    };

    fetchLikes();
  }, [post.id, user?.id]);

  const like = async () => {
    setPostLiked((prev) => !prev);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/feed/posts/${post.id}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
    } catch (error) {
      console.error(error);
      setPostLiked((prev) => !prev);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/feed/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/feed/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const editComment = async (id, content) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/feed/comments/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, content } : c))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    if (!content) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/feed/posts/${post.id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      const data = await response.json();
      setComments((prev) => [data, ...prev]);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (content, picture) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/feed/posts/${post.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, picture }),
      }
    );

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const data = await res.json();
    setPosts((prev) => prev.map((p) => (p.id === post.id ? data : p)));
    setShowMenu(false);
  };

  return (
    <>
      <Madal
        setShowModal={setEditing}
        onSubmit={editPost}
        showModal={editing}
        title="Editing a post"
        content={post.content}
        picture={post.picture}
      />

      <div className={classes.root}>
        <div className={classes.top}>
          <div className={classes.author}>
            <button onClick={() => navigate(`/profile/${post.author.id}`)}>
              <img
                className={classes.avatar}
                src={post.author.profilePicture || "/user1.jpeg"}
                alt=""
              />
            </button>
            <div>
              <div className={classes.name}>
                {post.author.firstName} {post.author.lastName}
              </div>
              <div className={classes.title}>
                {post.author.position} at {post.author.company}
              </div>
              <TimeAgo date={post.creationDate} edited={!!post.updatedDate} />
            </div>
          </div>
        </div>

        <div className={classes.content}>{post.content}</div>
        {post.picture && (
          <img src={post.picture} alt="" className={classes.picture} />
        )}

      </div>
    </>
  );
}
