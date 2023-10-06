import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import http from "../../../lib/http";

const Orders = () => {
  const api = http({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOrders();
    return () => {};
  }, []);

  async function getOrders() {
    const response = await api.get("/orders");
    setOrders(response.data);
  }

  async function handleChange(e) {
    setOrderId(e.target.value);
    const response = await api.get(`/order/${e.target.value}`);
    setOrder(response.data.data);
  }

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="orders">Orders</InputLabel>
        <Select
          labelId="orders"
          value={orderId}
          label="Orders"
          onChange={handleChange}
        >
          {orders.map((order, index) => {
            return (
              <MenuItem key={index} value={order.order_id}>
                {order.created_at} - {order.status}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Orders;
