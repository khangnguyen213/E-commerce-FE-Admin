import styles from "./AddProduct.module.css";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";
import Global from "../global";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errSer, setErrSer] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      short_desc: "",
      long_desc: "",
      price: 0,
      images: [],
    },
  });
  if (id) {
    axios.get(`${Global.BASE_BACKEND_API}/products/${id}`).then((res) => {
      console.log(res.data);
      setValue("name", res.data.name);
      setValue("category", res.data.category);
      setValue("short_desc", res.data.short_desc);
      setValue("long_desc", res.data.long_desc);
      setValue("price", res.data.price);
    });
  }
  const onSubmit = (data) => {
    console.log(data);
    if (id) {
      axios
        .post(
          `${Global.BASE_BACKEND_API}/edit-product`,
          { ...data, productId: id },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alertify.success(
              "<div style='color:white'>Successful Edit Product!</div>"
            );
            navigate("/products");
          }
        })
        .catch((err) => setErrSer(err.response.data.error.message));
    } else {
      axios
        .post(`${Global.BASE_BACKEND_API}/add-product`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alertify.success(
              "<div style='color:white'>Successful Add Product!</div>"
            );
            navigate("/products");
          }
        })
        .catch((err) => setErrSer(err.response.data.error.message));
    }
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            {...register("name", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            {...register("category", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            {...register("price", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductShortDesc">
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter short description"
            as="textarea"
            rows={3}
            {...register("short_desc", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductLongDesc">
          <Form.Label>Long Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter long description"
            as="textarea"
            rows={6}
            {...register("long_desc", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formProductFiles">
          <Form.Label>Images (Max 4 images)</Form.Label>
          <Form.Control type="file" multiple {...register("images")} />
          <Form.Text style={{ color: "red", fontWeight: "500" }}>
            {errSer ? errSer : ""}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
