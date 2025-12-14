import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "../../components/Box/Box";
import { Input } from "../../../../components/Input/Input";
import classes from "./Login.module.scss";
import { Separator } from "../../components/Separator/Separator";
import { useState } from "react";
import { useAuthentication } from "../../contexts/AuthenticationContextProvider";
import { Button } from "../../../../components/Button/Button";

export function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();

  const doLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      await login(email, password);
      const destination = location.state?.from || "/";
      navigate(destination);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occured.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Box>
        <h1>Login</h1>
        <h2></h2>

        <form onSubmit={doLogin}>
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email"
            onFocus={() => setErrorMessage("")}
          />

          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            onFocus={() => setErrorMessage("")}
          />

          {errorMessage && (
            <p className={classes.error}>{errorMessage}</p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "..." : "Login"}
          </Button>

          <Link to="/authentication/request-password-reset">
            Forgot password?
          </Link>
        </form>

        <Separator>Or</Separator>

        <div className={classes.register}>
          New to Instagram?{" "}
          <Link to="/authentication/signup">Sign Up</Link>
        </div>
      </Box>
    </div>
  );
}
