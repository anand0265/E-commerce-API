import { IOrder, IOrderItem } from "./order.dto";
import { pool } from "../../common/services/sql.service";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Create Order
export const createOrder = async (data: IOrder) => {
  const orderQuery = `
    INSERT INTO orders (
      user_id, total_price, shipping_address, payment_status, 
      order_status, coupon_code, discount_amount, shipping_cost, delivery_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const orderValues = [
    data.user_id,
    data.total_price,
    data.shipping_address,
    data.payment_status,
    data.order_status,
    data.coupon_code,
    data.discount_amount,
    data.shipping_cost,
    data.delivery_date
  ];

  const [orderResult] = await pool.execute<ResultSetHeader>(orderQuery, orderValues);
  const orderId = orderResult.insertId;

  // Insert Order Items
  const itemQuery = `
    INSERT INTO order_items (order_id, product_id, quantity, price, discount_price)
    VALUES ?
  `;
  const itemValues = data.items.map((item: IOrderItem) => [
    orderId,
    item.product_id,
    item.quantity,
    item.price,
    item.discount_price,
  ]);

  await pool.query(itemQuery, [itemValues]);

  return { id: orderId, ...data };
};

// Update Order (PUT)
export const updateOrder = async (id: number, data: IOrder) => {
  const query = `
    UPDATE orders SET 
      user_id = ?, total_price = ?, shipping_address = ?, 
      payment_status = ?, order_status = ?, coupon_code = ?, 
      discount_amount = ?, shipping_cost = ?, delivery_date = ?
    WHERE id = ?
  `;

  const values = [
    data.user_id,
    data.total_price,
    data.shipping_address,
    data.payment_status,
    data.order_status,
    data.coupon_code,
    data.discount_amount,
    data.shipping_cost,
    data.delivery_date,
    id
  ];

  await pool.execute(query, values);

  // Remove old items and re-insert
  await pool.execute("DELETE FROM order_items WHERE order_id = ?", [id]);

  const itemQuery = `
    INSERT INTO order_items (order_id, product_id, quantity, price, discount_price)
    VALUES ?
  `;
  const itemValues = data.items.map((item: IOrderItem) => [
    id,
    item.product_id,
    item.quantity,
    item.price,
    item.discount_price,
  ]);

  await pool.query(itemQuery, [itemValues]);

  return { id, ...data };
};

// Edit Order (PATCH)
export const editOrder = async (id: number, data: Partial<IOrder>) => {
  if (Object.keys(data).length === 0) {
    throw new Error("No fields to update");
  }

  const updates: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "items") {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  }

  const query = `UPDATE orders SET ${updates.join(", ")} WHERE id = ?`;
  values.push(id);
  await pool.execute(query, values);

  return { id, ...data };
};

// Delete Order
export const deleteOrder = async (id: number) => {
  await pool.execute("DELETE FROM order_items WHERE order_id = ?", [id]);
  await pool.execute("DELETE FROM orders WHERE id = ?", [id]);
  return { id, deleted: true };
};

// Get Order by ID
export const getOrderById = async (id: number) => {
  const [orderRows] = await pool.execute<RowDataPacket[]>("SELECT * FROM orders WHERE id = ?", [id]);
  if (orderRows.length === 0) return null;

  const [itemRows] = await pool.execute<RowDataPacket[]>("SELECT * FROM order_items WHERE order_id = ?", [id]);
  return {
    ...orderRows[0],
    items: itemRows
  };
};

// Get All Orders
export const getAllOrders = async () => {
  const [orderRows] = await pool.execute<RowDataPacket[]>("SELECT * FROM orders");

  const ordersWithItems = await Promise.all(orderRows.map(async (order: any) => {
    const [items] = await pool.execute<RowDataPacket[]>("SELECT * FROM order_items WHERE order_id = ?", [order.id]);
    return { ...order, items };
  }));

  return ordersWithItems;
};
