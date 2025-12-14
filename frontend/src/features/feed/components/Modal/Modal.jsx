import { useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import classes from "./Modal.module.scss";

export function Madal({
  setShowModal,
  showModal,
  onSubmit,
  content,
  picture,
  title,
}) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!showModal) return null;

  return (
    <div className={classes.root}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3 className={classes.title}>{title}</h3>
          <button onClick={() => setShowModal(false)}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.003 512.003"
              fill="white"
            >
              <polygon points="256.001,158.605 114.833,17.437 17.437,114.83 158.605,256 17.437,397.17 114.833,494.563 255.603,353.793 256.001,353.395"></polygon>
              <path d="M378.055,256l128.84-128.839c6.809-6.809,6.809-17.85,0-24.659L409.498,5.105c-6.807-6.807-17.85-6.807-24.659,0L256.001,133.944L127.162,5.105C122.643,1.303,118.737,0,114.833,0c-4.462,0-8.926,1.704-12.329,5.107L5.108,102.503c-6.809,6.809-6.809,17.85,0,24.659L133.948,256L5.108,384.839c-6.809,6.809-6.809,17.85,0,24.659l97.395,97.395c6.807,6.809,17.85,6.809,24.659,0l140.771-140.772c0.413-0.413,0.802-0.844,1.168-1.292c0.277-0.34,0.527-0.694,0.776-1.048c0.289-0.432,0.549-0.877,0.795-1.329c0.244-0.459,0.462-0.926,0.663-1.4c0.185-0.45,0.344-0.907,0.49-1.367c0.127-0.422,0.227-0.849,0.321-1.278c0.08-0.405,0.131-0.814,0.183-1.222c0.051-0.525,0.075-1.053,0.078-1.58V165.829L397.171,42.095l72.737,72.737L341.068,243.671c-6.809,6.809-6.809,17.85,0,24.661l128.84,128.839-72.737,72.737-60.407-60.407c-6.809-6.809-17.85-6.809-24.661,0c-6.809,6.809-6.809,17.85,0,24.661l72.737,72.737c6.807,6.809,17.85,6.809,24.659,0l97.395-97.395c6.809-6.809,6.809-17.85,0-24.659L378.055,256z"></path>
            </svg>
          </button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);

            const form = e.currentTarget;
            const content = form.content.value;
            const picture = form.picture.value;

            if (!content) {
              setError("");
              setIsLoading(false);
              return;
            }

            try {
              await onSubmit(content, picture);
            } catch (error) {
              setError(
                error instanceof Error
                  ? error.message
                  : "An error occurred. Please try again later."
              );
            } finally {
              setIsLoading(false);
              setShowModal(false);
            }
          }}
        >
          <div className={classes.body}>
            <textarea
              placeholder="What do you want to talk about?"
              onFocus={() => setError("")}
              onChange={() => setError("")}
              name="content"
              defaultValue={content}
            />
            <Input
              defaultValue={picture}
              placeholder="Image URL (optional)"
              name="picture"
              style={{ marginBlock: 0 }}
            />
          </div>

          {error && <div className={classes.error}>{error}</div>}

          <div className={classes.footer}>
            <Button size="medium" type="submit" disabled={isLoading}>
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
