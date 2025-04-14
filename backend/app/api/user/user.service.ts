import { type IUser } from "./user.dto";
import { pool } from "../../common/services/sql.service";
import { type RowDataPacket, type ResultSetHeader } from "mysql2";
import bcrypt from 'bcrypt';


export const createUser = async (data: IUser) => {
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  const values = [data.email, data.password];
  const [result] = await pool.execute<ResultSetHeader>(query, values);
  return { id: result.insertId, ...data };
};


export const updateUser = async (id: number, data: IUser) => {

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const query = "UPDATE users SET email = ?, password = ? WHERE id = ?";
  const values = [data.email, hashedPassword, id];
  await pool.execute(query, values);

  return { id, ...data, password: hashedPassword }; 
};


export const editUser = async (
  id: number,
  data: IUser
): Promise<IUser & { id: number }> => {
  let query = "UPDATE users SET ";
  const updates: string[] = [];
  const values: any[] = [];

  Object.keys(data).forEach((key) => {
    updates.push(`${key} = ?`);
    values.push((data as any)[key]);
  });

  query += updates.join(", ") + " WHERE id = ?";
  values.push(id);

  await pool.execute(query, values);

  return { id, ...data };  
};


export const deleteUser = async (id: number) => {
  const query = "DELETE FROM users WHERE id = ?";
  await pool.execute(query, [id]);
  return { id, deleted: true };
};

export const getUserById = async (id: number) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
  return rows[0] || null;
};

export const getAllUsers = async () => {
  const query = "SELECT * FROM users";
  const [rows] = await pool.execute(query);
  return rows;
};

export const getUserByEmail = async (email: string) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await pool.execute<RowDataPacket[]>(query, [email]);
  return rows.length > 0 ? rows[0] : null;
};


