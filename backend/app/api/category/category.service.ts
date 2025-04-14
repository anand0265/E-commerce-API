import { type ICategory } from "./category.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";


export const createCategory = async (data: ICategory) => {
  const query = `
      INSERT INTO category (title)
      VALUES (?)
    `;
  const values = [data.title];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  return { id: result.insertId, ...data };
};


export const updateCategory = async (id: number, data: ICategory) => {
  const query = `
      UPDATE category
      SET title = ?
      WHERE id = ?
    `;
  const values = [data.title, id];
  await pool.execute(query, values);
  return { id, ...data };
};


export const editCategory = async (id: number, data: Partial<ICategory>) => {
  if (Object.keys(data).length === 0) {
    throw new Error("No fields to update");
  }

  let query = "UPDATE category SET ";
  const updates: string[] = [];
  const values: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  });

  query += updates.join(", ") + " WHERE id = ?";
  values.push(id);

  await pool.execute(query, values);
  return { id, ...data };
};


export const deleteCategory = async (id: number) => {
  const query = "DELETE FROM category WHERE id = ?";
  await pool.execute(query, [id]);
  return { id, deleted: true };
};


export const getCategoryById = async (id: number) => {
  const query = "SELECT * FROM category WHERE id = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
  return rows[0] || null;
};


export const getAllCategory = async () => {
  const query = "SELECT * FROM category";
  const [rows] = await pool.execute<RowDataPacket[]>(query);
  return rows;
};
