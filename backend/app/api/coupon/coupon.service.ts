

import { ICoupon } from "./coupon.dto";
import { pool } from '../../common/services/sql.service';
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Create a new coupon
export const createCoupon = async (data: ICoupon) => {
  const query = `
    INSERT INTO coupons (code, discount_type, discount_value, expires_at, is_active)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.execute<ResultSetHeader>(query, [
    data.code,
    data.discount_type,
    data.discount_percent,
    data.expires_at ?? null,
    data.is_active ?? true,
  ]);

  return { id: result.insertId, ...data };
};

// Update coupon
export const updateCoupon = async (id: number, data: Partial<ICoupon>) => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.code !== undefined) {
    fields.push("code = ?");
    values.push(data.code);
  }
  if (data.discount_type !== undefined) {
    fields.push("discount_type = ?");
    values.push(data.discount_type);
  }
  if (data.discount_percent !== undefined) {
    fields.push("discount_value = ?");
    values.push(data.discount_percent);
  }
  if (data.expires_at !== undefined) {
    fields.push("expires_at = ?");
    values.push(data.expires_at);
  }
  if (data.is_active !== undefined) {
    fields.push("is_active = ?");
    values.push(data.is_active);
  }

  if (fields.length === 0) return { id, updated: false };

  const query = `UPDATE coupons SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  await pool.execute(query, values);
  return { id, ...data };
};

// Delete coupon
export const deleteCoupon = async (id: number) => {
  await pool.execute("DELETE FROM coupons WHERE id = ?", [id]);
  return { id, deleted: true };
};

// Get coupon by code
export const getCouponByCode = async (code: string) => {
  const query = `SELECT * FROM coupons WHERE code = ? AND is_active = 1`;
  const [rows] = await pool.execute<RowDataPacket[]>(query, [code]);
  return rows.length > 0 ? rows[0] : null;
};

// Get all coupons
export const getAllCoupons = async () => {
  const query = `SELECT * FROM coupons`;
  const [rows] = await pool.execute<RowDataPacket[]>(query);
  return rows;
};
