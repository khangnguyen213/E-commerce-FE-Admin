import styles from "./Products.module.css";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import Global from "../global";

const Products = () => {
  const [products, setProducts] = useState();
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  let timer;
  const convertMoney = (money) => {
    const str = money + "";
    let output = "";

    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      count++;
      output = str[i] + output;

      if (count % 3 === 0 && i !== 0) {
        output = "." + output;
        count = 0;
      }
    }

    return output;
  };

  useEffect(() => {
    axios
      .get(`${Global.BASE_BACKEND_API}/products`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
  }, []);

  const deleteProductHandler = (id) => {
    axios
      .post(
        `${Global.BASE_BACKEND_API}/delete-product`,
        { productId: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alertify.success(
            "<div style='color:white'>Successful Delete Product!</div>"
          );
          navigate(0);
        }
      })
      .catch((err) => console.log(err.response.data.error.message));
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <InputGroup
          className={styles.summary}
          onChange={(e) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
              setSearchKey(e.target.value);
              console.log("Searching", e.target.value);
            }, 1000);
          }}
        >
          <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          <Form.Control
            placeholder="Ex: Glaxay Note..."
            aria-label="Ex: Glaxay Note..."
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button variant="outline-dark" onClick={() => navigate("/add-product")}>
          Add Product
        </Button>
      </div>
      <div className={styles.history}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID Product</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products
                .filter((product) => product.name.includes(searchKey))
                .map((value) => (
                  <tr key={value._id}>
                    <td>
                      <h6>{value._id}</h6>
                    </td>
                    <td>
                      {" "}
                      <img
                        src={`data:${value.type1};charset=utf-8;base64,${value.img1}`}
                        alt="..."
                        width="160"
                      />
                      {/* <img src={value.img1} alt="..." width="160" /> */}
                    </td>
                    <td>
                      <h6>{value.name}</h6>
                    </td>
                    <td>
                      <h6>{value.category}</h6>
                    </td>
                    <td>
                      <h6>{convertMoney(value.price)}</h6>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <Button
                          variant="success"
                          onClick={() => navigate(`/add-product/${value._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => deleteProductHandler(value._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
