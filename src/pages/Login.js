import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Reducer/sessionSlice";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errSer, setErrSer] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    const requestBody = { ...data, reqAdmin: true };
    axios
      .post("http://localhost:5000/users/signin", JSON.stringify(requestBody), {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(login(res.data));
        alertify.success("<div style='color:white'>Successful Login!</div>");
        const path = res.data.role === "admin" ? "/dashboard" : "/chat";
        navigate(path);
      })
      .catch((err) => setErrSer(err.response.statusText));
  };
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2>LOGIN</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              {...register("email", { required: "This is required" })}
            />
            <Form.Text>{errors.email ? errors.email.message : ""}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: "This is required" })}
            />
            <Form.Text>
              {errors.password ? errors.password.message : ""}
            </Form.Text>
            <Form.Text>{errSer ? errSer : ""}</Form.Text>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
