import { useNavigate } from "react-router-dom";
import { Box } from "../../components/Box/Box";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import classes from "./ResetPassword.module.scss";
import { useState } from "react";

export function Resetpassword() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  // called when click on forgot pw button
  const sendPasswordResetToken = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/authentication/send-password-reset-token?email=${email}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setErrorMessage("");
        setEmailSent(true);
        return;
      }

      const { message } = await response.json();
      setErrorMessage(message);
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // called when next is clicked
  const resetPassword = async (email, code, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/authentication/reset-password?email=${email}&token=${code}&newPassword=${password}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setErrorMessage("");
        navigate("/");
        return;
      }

      const { message } = await response.json();
      setErrorMessage(message);
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Box>
        <h1>Reset Password</h1>

        {!emailSent ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);

              const email = e.currentTarget.email.value;
              await sendPasswordResetToken(email);
              setEmail(email);

              setIsLoading(false);
            }}
          >
            <p>
              Enter your email and we'll send a verification code if it matches
              an existing Instagram account.
            </p>

            <Input name="email" type="email" label="Email" />

            <p style={{ color: "red" }}>{errorMessage}</p>

            <Button type="submit">Next</Button>
            <Button
              type="button"
              outline
              onClick={() => {
                navigate("/login");
              }}
            >
              Back
            </Button>
          </form>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);

              const code = e.currentTarget.code.value;
              const password = e.currentTarget.password.value;

              await resetPassword(email, code, password);

              setIsLoading(false);
            }}
          >
            <p>
              Enter the verification code we sent to your email and your new
              password.
            </p>

            <Input
              type="text"
              label="Verification Code"
              name="code"
            />
            <Input
              label="New Password"
              name="password"
              type="password"
              id="password"
            />

            <p style={{ color: "red" }}>{errorMessage}</p>

            <Button type="submit">Reset Password</Button>
            <Button
              type="button"
              outline
              onClick={() => {
                setErrorMessage("");
                setEmailSent(false);
              }}
            >
              Back
            </Button>
          </form>
        )}
      </Box>
    </div>
  );
}
