import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
// import UserAPI from "../API/UserAPI";
import alertify from "alertifyjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Global from "../global";

const Register = () => {
  const navigate = useNavigate();
  const [errSer, setErrSer] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      phone: "",
      fullname: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    const requestBody = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: "admin",
    };
    console.log(requestBody);

    // UserAPI.postSignUp(requestBody)
    //   .then((res) => {
    //     console.log(res.json());
    //     alertify.success(
    //       "<div style='color:white'>Successful Registration!</div>"
    //     );
    //   })
    //   .catch((err) => console.log(err));
    axios
      .post(
        `${Global.BASE_BACKEND_API}/users/signup`,
        JSON.stringify(requestBody),
        {
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        alertify.success(
          "<div style='color:white'>Successful Registration!</div>"
        );
        navigate("/login");
      })
      .catch((err) => setErrSer(err.response.statusText));
    // alertify.set("notifier", "position", "bottom-left");
    // alertify.notify("Bạn Đã Xóa Hàng Thành Công!");
  };
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2>Register</h2>
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
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              {...register("fullname", { required: "This is required" })}
            />
            <Form.Text>
              {errors.fullname ? errors.fullname.message : ""}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              {...register("phone", { required: "This is required" })}
            />
            <Form.Text>{errors.phone ? errors.phone.message : ""}</Form.Text>
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

export default Register;
