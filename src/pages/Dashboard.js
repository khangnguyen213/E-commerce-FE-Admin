import styles from "./Dashboard.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/Alert";

const Dashboard = () => {
  const [carts, setCarts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/carts", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setCarts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const countUser = (carts) => {
    const uniq = [...new Set(carts.map((cart) => cart.user))];
    return uniq.length;
  };

  const countEarning = (carts) => {
    const money = carts
      .map((cart) => Number(cart.total.split(".").join("")))
      .reduce((partialSum, a) => partialSum + a, 0);

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

  return (
    <div className={styles.container}>
      Dashboard
      <div className={styles.summary}>
        <Alert variant="info" className={styles.summary_1}>
          <div className={styles.summary_2}>
            <h2>{carts && countUser(carts)}</h2>
            <p>Clients</p>
          </div>
          <div>
            <i className="fa-solid fa-user"></i>
          </div>
        </Alert>
        <Alert variant="info" className={styles.summary_1}>
          <div className={styles.summary_2}>
            <h2>{carts && countEarning(carts)}</h2>
            <p>Earning</p>
          </div>
          <div>
            <i className="fa-solid fa-coins"></i>
          </div>
        </Alert>
        <Alert variant="info" className={styles.summary_1}>
          <div className={styles.summary_2}>
            <h2>{carts && carts.length}</h2>
            <p>Orders</p>
          </div>
          <div>
            <i className="fa-solid fa-wallet"></i>
          </div>
        </Alert>
      </div>
      <div className={styles.history}>
        <h2>History</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID User</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Total</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {carts &&
              carts.map((cart) => {
                return (
                  <tr key={cart._id}>
                    <td>{cart.user}</td>
                    <td>{cart.name}</td>
                    <td>{cart.phone}</td>
                    <td>{cart.address}</td>
                    <td>{cart.status}</td>
                    <td>{cart.total}</td>
                    <td>
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => navigate(`/history/${cart._id}`)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
