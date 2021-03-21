import React, { useState, useContext, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Login.css";
import { UserContext } from "../../App";
import {
  googleSIgnIn,
  initiateLoginFramework,
  fbSignIn,
  createAccountWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./LoginManager";
import { useHistory, useLocation } from "react-router";


const required = "This field is required";

const errorMessage = (error) => {
  return <div className="invalid-feedback">{error}</div>;
};

const Login = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const [newUser, setNewUser] = useState(false);
  const [loogedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  initiateLoginFramework();
  handleSubmit();
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };
  const handleGoogleSignIn = () => {
    googleSIgnIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const handleFbSignIn = () => {
    fbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const onSubmit = (data) => {
    setUser(data);
    if (newUser && data.name && data.email && data.password) {
      createAccountWithEmailAndPassword(
        data.name,
        data.email,
        data.password
      ).then((res) => {
        handleResponse(res, false);
      });
    }
    if (!newUser && data.email && data.password) {
      signInWithEmailAndPassword(data.email, data.password).then((res) => {
        handleResponse(res, true);
      });
    }
  };

  return (
    <Container>
      <div className="form-container rounded">
        <h4>Create an Account</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {newUser && (
            <input
              name="name"
              type="text"
              ref={register({ required: true })}
              placeholder="Name"
            />
          )}
          {errors.name && errorMessage(required)}

          <br />
          <input
            name="email"
            type="text"
            ref={register({ required: "Enter a valid Email" })}
            placeholder="Email"
            message="You must enter an valid Email"
          />
          {errors.email &&
            errors.email.type === "required" &&
            errorMessage(required)}
          <br />
          <input
            name="password"
            type="password"
            ref={register({
              required: "You must type a password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            placeholder="Password"
          />
          {errors.password && errorMessage(errors.password.message)}
          <br />

          {newUser && (
            <input
              name="password_repeat"
              type="password"
              ref={register({
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
              placeholder="Confirm Password"
            />
          )}
          {errors.password_repeat &&
            errorMessage(errors.password_repeat.message)}
          <br />

          <input
            className="btn btn-success"
            type="submit"
            value={newUser ? "Sign Up" : "Log In"}
          />
          <br />

          <span className="d-flex align-items-center mx-auto fs-3">
            {newUser ? "Already have an account" : "Don't have an account?"}
            <button
              onClick={() => setNewUser(!newUser)}
              className="text-warning btn-link border-0 bg-light"
            >
              {!newUser ? "Sign Up" : "Log In"}
            </button>
          </span>
        </form>
        {user.success ? (
          <h5 className="text-success text-center mt-3">
            User {newUser ? "created" : "logged in"} Successfully
          </h5>
        ) : (
          <h5 className="text-danger text-center mt-3">{user.error}</h5>
        )}
      </div>
      <div className="app-authentication">
        <div className="google">
          <Button className="app-btn d-flex align-items-center justify-content-between" onClick={handleGoogleSignIn} variant="danger w-75">
            <i className="fab fa-lg fa-google"></i>Continue with Google
          </Button>
        </div>
        <div className="facebook">
          <Button className="app-btn d-flex align-items-center justify-content-between" onClick={handleFbSignIn} variant="primary w-75">
            <i className="fab fa-lg fa-facebook"></i>Continue with Facebook
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
