import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import styles from "./DetailHistory.module.css";
// import HistoryAPI from "../../API/HistoryAPI";

function DetailHistory(props) {
  const { id } = useParams();

  const [cart, setCart] = useState([]);

  const [information, setInformation] = useState({});

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
      .get(`http://localhost:5000/users/cart/${id}`)
      .then((res) => {
        console.log(res);
        setCart(res.data.cartItems);

        setInformation(res.data.cart);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.history}>
        <h1 className="h2 text-uppercase">Order information</h1>
        <p>ID User: {information.user}</p>
        <p>Full Name: {information.name}</p>
        <p>Phone: {information.phone}</p>
        <p>Address: {information.address}</p>
        <p>Total: {information.total} VND</p>
      </div>

      <div className={styles.history}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID Product</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((value) => (
                <tr key={value.productId._id}>
                  <td>
                    <h6>{value.productId._id}</h6>
                  </td>
                  <td>
                    {" "}
                    <img src={value.productId.img1} alt="..." width="200" />
                  </td>
                  <td>
                    <h6>{value.productId.name}</h6>
                  </td>
                  <td>
                    <h6>{convertMoney(value.productId.price)}</h6>
                  </td>
                  <td>
                    <h6>{value.quantity}</h6>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DetailHistory;
