import { type ICart, type ICartItem } from "./cart.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";

   // Create 

export const createCart = async (data: ICart) => {
  // Check if the user exists
  const userCheckQuery = `SELECT id FROM users WHERE id = ?`;
  const [userResult] = await pool.execute(userCheckQuery, [data.userId]);

  // Insert the cart
  const query = `
    INSERT INTO carts (user_id, total_price)
    VALUES (?, ?)
  `;
  const [result] = await pool.execute<ResultSetHeader>(query, [data.userId, data.totalPrice]);
  const cartId = result.insertId;

  // Insert cart items
  for (const item of data.items) {
    const itemQuery = `
      INSERT INTO cart_items (cart_id, product_id, name, image, price, quantity, stock)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      cartId,
      item.product,
      item.name,
      item.image || null,
      item.price,
      item.quantity,
      item.stock || null,
    ];
    await pool.execute(itemQuery, values);
  }

  return { id: cartId, ...data };
};

// Update
export const updateCart = async (id: number, data: Partial<ICart>) => {
  if (data.totalPrice !== undefined) {
    const query = `UPDATE carts SET total_price = ? WHERE id = ?`;
    await pool.execute(query, [data.totalPrice, id]);
  }

  return { id, ...data };
};



// Delete 
export const deleteCart = async (id: number) => {
  await pool.execute("DELETE FROM cart_items WHERE cart_id = ?", [id]);
  await pool.execute("DELETE FROM carts WHERE id = ?", [id]);
  return { id, deleted: true };
};



// Get cart by ID
export const getCartById = async (id: number) => {
  const cartQuery = `SELECT * FROM carts WHERE id = ?`;
  const [cartRows] = await pool.execute<RowDataPacket[]>(cartQuery, [id]);

  if (cartRows.length === 0) return null;

  const itemsQuery = `SELECT * FROM cart_items WHERE cart_id = ?`;
  const [itemRows] = await pool.execute<RowDataPacket[]>(itemsQuery, [id]);

  return {
    ...cartRows[0],
    items: itemRows,
  };
};


// Get all carts (Admin or testing)
export const getAllCarts = async () => {
  const query = `SELECT * FROM carts`;
  const [rows] = await pool.execute<RowDataPacket[]>(query);
  return rows;
};

