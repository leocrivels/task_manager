import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (data) => {
      setMessage("");
      setLoading(true);

      AuthService.register(data.name, data.email, data.password).then(
        () => {
          setLoading(false);
          navigate("/login");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );

    },
  });

  return (
    <Container className="my-2 py-2" style={{ backgroundColor: "white" }}>
      <h1>REGISTER</h1>
      <div>
        <form onSubmit={formik.handleSubmit} ref={form}>
          
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <div className="text-danger">
              {formik.errors.name ? formik.errors.name : null}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="text-danger">
              {formik.errors.email ? formik.errors.email : null}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="text-danger">
              {formik.errors.password ? formik.errors.password : null}
            </div>
          </div>

          <Stack className="form-group mt-2" direction="horizontal">

            <Button
              variant="warning"
              type="Button"
              className="float-right mx-1 ms-auto"
              onClick={formik.handleReset}
            >
              Reset
            </Button>

            <Button
              variant="primary"
              className="mx-1"
              disabled={loading}
              type="submit"
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Register</span>
            </Button>
            
          </Stack>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <Button style={{ display: "none" }} ref={checkBtn} />
        </form>
      </div>
    </Container>
  );
};
export default Login;
