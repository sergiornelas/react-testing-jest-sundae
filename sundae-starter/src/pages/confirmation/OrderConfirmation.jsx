import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Button from "react-bootstrap/Button";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrder] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrder(response.data.orderNumber));
    // TODO
    // .catch((error) => setOrder(error));
  }, []);

  return orderNumber ? (
    <div style={{ textAlign: "center" }}>
      <h1>Thank you!</h1>
      <p>Your order number is: {orderNumber} </p>
      <p style={{ fontSize: "25%" }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <Button
        onClick={() => {
          resetOrder();
          setOrderPhase("inProgress");
        }}
      >
        Create new order
      </Button>
    </div>
  ) : (
    <p>Loading</p>
  );
}
