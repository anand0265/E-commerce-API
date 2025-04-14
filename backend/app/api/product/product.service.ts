import {type IProduct} from "./product.dto"
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";

// create product
export const createProduct = async (data: IProduct) => {
    const query = `
      INSERT INTO products (
        name, 
        description, 
        price, 
        discountPrice, 
        stockQuantity, 
        categoryId, 
        images, 
        brand, 
        rating, 
        tags, 
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      data.name,
      data.description,
      data.price,
      data.discountPrice ?? 0,
      data.stockQuantity,
      data.categoryId,
      data.images?.join(',') ?? null, 
      data.brand ?? null,
      data.rating ?? 0,
      data.tags?.join(',') ?? null, 
      data.status ?? 'active',
      
    ];
  
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    return { id: result.insertId, ...data };
  };

  // update product
  export const updateProduct = async (id: number, data: Partial<IProduct>) => {
    const query = `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        discountPrice = ?,
        stockQuantity = ?,
        categoryId = ?,
        images = ?,
        brand = ?,
        rating = ?,
        tags = ?,
        status = ?
      WHERE id = ?
    `;
  
    const values = [
      data.name,
      data.description,
      data.price,
      data.discountPrice ?? 0,
      data.stockQuantity,
      data.categoryId,
      data.images?.join(',') ?? null,
      data.brand ?? null,
      data.rating ?? 0,
      data.tags?.join(',') ?? null,
      data.status ?? 'active',
      id
    ];
  
    await pool.execute(query, values);
    return { id, ...data };
  };

  // edit product
  export const editProduct = async (id: number, data: Partial<IProduct>) => {
    if (Object.keys(data).length === 0) {
      throw new Error("No fields to update");
    }
  
    let query = "UPDATE products SET ";
    const updates: string[] = [];
    const values: any[] = [];
  
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          updates.push(`${key} = ?`);
          values.push(value.join(',')); // Convert arrays (e.g. images, tags) to comma-separated string
        } else if (typeof value === 'object' && key === 'meta') {
          updates.push(`${key} = ?`);
          values.push(JSON.stringify(value)); // Convert meta object to JSON string
        } else {
          updates.push(`${key} = ?`);
          values.push(value);
        }
      }
    });
  
    query += updates.join(", ") + " WHERE id = ?";
    values.push(id);
  
    await pool.execute(query, values);
    return { id, ...data };
  };

  // delete product
  export const deleteProduct = async (id: number) => {
    const query = "DELETE FROM products WHERE id = ?";
    await pool.execute(query, [id]);
    return { id, deleted: true };
  };

  // get product
  export const getProductById = async (id: number) => {
    const query = "SELECT * FROM products WHERE id = ?";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return rows[0] || null;
  };

  // get all
  export const getAllProducts = async () => {
    const query = "SELECT * FROM products";
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows;
  };